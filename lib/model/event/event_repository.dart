import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_dto.dart';
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

  Stream<List<EventModel>> getEvents({int? limit}) {
    return events.limit(limit ?? 5).snapshots().map((snapshot) {
      return snapshot.docs
          .map((doc) => EventDTO.fromMap(doc).toModel())
          .toList();
    });
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
}
