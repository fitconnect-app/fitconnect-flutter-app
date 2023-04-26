import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class EventRepository {
  CollectionReference events = FirebaseInstance.firestore.collection('events');

  Future<EventModel?> getEvent(String id, bool getCache) async {
  final doc = await events
      .doc(id)
      .get(getCache ? const GetOptions(source: Source.cache) : null);
  if (doc.exists) {
    return EventDTO.fromMap(doc).toModel();
  } else {
    return null;
  }
}

  Future<List<EventModel>> getEvents(
      {int? limit, String? sport, required bool getCache}) async {
    final now = DateTime.now();

    var futureEventsQuery = events
        .where('startDate', isGreaterThan: now)
        .orderBy('startDate', descending: false);

    var pastEventsQuery = events
        .where('startDate', isLessThan: now)
        .orderBy('startDate', descending: true);

    if (sport != null) {
      futureEventsQuery = futureEventsQuery.where('sport', isEqualTo: sport);
      pastEventsQuery = pastEventsQuery.where('sport', isEqualTo: sport);
    }

    if (limit != null) {
      futureEventsQuery = futureEventsQuery.limit(limit);
      pastEventsQuery = pastEventsQuery.limit(limit);
    }

    final futureEvents = await futureEventsQuery
        .get(getCache ? const GetOptions(source: Source.cache) : null);
    final pastEvents = await pastEventsQuery
        .get(getCache ? const GetOptions(source: Source.cache) : null);

    final futureEventsList = futureEvents.docs
        .map((doc) => EventDTO.fromMap(doc).toModel())
        .toList();
    final pastEventsList =
        pastEvents.docs.map((doc) => EventDTO.fromMap(doc).toModel()).toList();

    final today = futureEventsList.where(
      (event) =>
          event.startDate.toDate().day == now.day &&
          event.startDate.toDate().month == now.month &&
          event.startDate.toDate().year == now.year,
    );

    futureEventsList.removeWhere((element) => today.contains(element));

    final orderedEvents = [...today, ...futureEventsList, ...pastEventsList];
    return orderedEvents;
  }

  Future<EventModel> createEvent(EventDTO event) async {
    final docRef = await events.add(event.toMap());
    event.setId = docRef.id;
    return event.toModel();
  }

  Future<void> updateEvent(EventDTO event) async {
    await events.doc(event.id).update(event.toMap());
  }

  Future<void> deleteEvent(String id) async {
    await events.doc(id).delete();
  }

  Future<List<EventModel>> getMostRecentUserEvents(
      String userId, bool getCache) async {
    final DateTime lastWeek = DateTime.now().subtract(const Duration(days: 7));
    final Timestamp now = Timestamp.now();
    var ownedEvents = await events
        .where('eventOwner', isEqualTo: userId)
        .where('startDate',
            isGreaterThanOrEqualTo: Timestamp.fromDate(lastWeek))
        .where('startDate', isLessThan: now)
        .get(getCache ? const GetOptions(source: Source.cache) : null);
    var joinedEvents = await events
        .where('participants', arrayContains: userId)
        .where('startDate',
            isGreaterThanOrEqualTo: Timestamp.fromDate(lastWeek))
        .where('startDate', isLessThan: now)
        .get();
    List<DocumentSnapshot> allRecentEvents =
        ownedEvents.docs + joinedEvents.docs;

    return allRecentEvents
        .map((doc) => EventDTO.fromMap(doc).toModel())
        .toList();
  }
}
