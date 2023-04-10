import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class EventRepository {
  CollectionReference events = FirebaseInstance.firestore.collection('events');

  Future<EventModel?> getEvent(String id) async {
    final doc = await events.doc(id).get();
    if (doc.exists) {
      return EventDTO.fromMap(doc).toModel();
    } else {
      return null;
    }
  }

  Future<List<EventModel>> getEvents({int? limit, String? sport}) async {
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

    final futureEvents = await futureEventsQuery.get();
    final pastEvents = await pastEventsQuery.get();

    final futureEventsList = futureEvents.docs
        .map((doc) => EventDTO.fromMap(doc).toModel())
        .toList();
    final pastEventsList =
        pastEvents.docs.map((doc) => EventDTO.fromMap(doc).toModel()).toList();

    final orderedEvents = [
      ...pastEventsList,
      ...futureEventsList,
    ].toList();

    orderedEvents.sort((a, b) {
      var aStartDate = a.startDate.toDate();
      var bStartDate = b.startDate.toDate();
      final diffA = aStartDate.difference(now).abs();
      final diffB = bStartDate.difference(now).abs();

      if (aStartDate.isAfter(now) && bStartDate.isBefore(now)) {
        return -1;
      } else if (aStartDate.isBefore(now) && bStartDate.isAfter(now)) {
        return 1;
      } else if (aStartDate.isAfter(now) && bStartDate.isAfter(now)) {
        return aStartDate.compareTo(bStartDate);
      } else if (aStartDate.isBefore(now) && bStartDate.isBefore(now)) {
        return bStartDate.compareTo(aStartDate);
      } else {
        return diffA.compareTo(diffB);
      }
    });

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

  Future<List<EventModel>> getMostRecentUserEvents(String userId) async {
    final DateTime lastWeek = DateTime.now().subtract(const Duration(days: 7));
    var ownedEvents = await events
        .where('eventOwner', isEqualTo: userId)
        .where('startDate',
            isGreaterThanOrEqualTo: Timestamp.fromDate(lastWeek))
        .get();
    var joinedEvents = await events
        .where('participants', arrayContains: userId)
        .where('startDate',
            isGreaterThanOrEqualTo: Timestamp.fromDate(lastWeek))
        .get();
    List<DocumentSnapshot> allRecentEvents =
        ownedEvents.docs + joinedEvents.docs;

    return allRecentEvents
        .map((doc) => EventDTO.fromMap(doc).toModel())
        .toList();
  }
}
