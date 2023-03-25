import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';

class EventViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;

  Future<void> createEvent(sport, playersNeeded, playersBrought, startDateTime,
      duration, location) async {
    Trace createEventTrace =
        FirebasePerformance.instance.newTrace('_create_event');
    createEventTrace.start();
    var uid = _auth.currentUser?.uid ?? '';
    if (sport == null ||
        playersNeeded == null ||
        playersBrought == null ||
        startDateTime == null ||
        duration == null ||
        duration == const Duration() ||
        location == null ||
        location == "") {
      throw Exception("Event fields cannot be empty");
    }
    final startDate = Timestamp.fromDate(startDateTime);
    final endDate = Timestamp.fromDate(startDateTime.add(duration));
    final event = EventModel(
        sport: Sports.values.firstWhere((e) => e.getString() == sport),
        playersNeeded: playersNeeded,
        playersBrought: playersBrought,
        spotsAvailable: playersNeeded,
        startDate: startDate,
        endDate: endDate,
        participantsIds: <String>[],
        eventOwnerId: uid,
        location: location);
    await _eventRepository.createEvent(EventDTO.fromModel(event));
    createEventTrace.stop();
  }
}
