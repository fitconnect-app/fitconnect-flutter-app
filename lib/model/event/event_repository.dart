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
    Query<Map<String, dynamic>> query = FirebaseFirestore.instance
        .collection('events')
        .orderBy('startDate', descending: true);

    if (sport != null) {
      query = query.where('sport', isEqualTo: sport);
    }

    if (limit != null) {
      query = query.limit(limit);
    }

    final snapshot = await query.get();
    final List<EventModel> events =
        snapshot.docs.map((doc) => EventDTO.fromMap(doc).toModel()).toList();

    return events;
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
