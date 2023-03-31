import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';

class EventCreateViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;
  CreateState _state = CreateState.initial;

  CreateState get state => _state;

  set state(CreateState value) {
    _state = value;
    notifyListeners();
  }

  Future<void> createEvent(sport, playersNeeded, playersBrought, startDateTime,
      duration, location) async {
    Trace createEventTrace =
        FirebasePerformance.instance.newTrace('createEvent');
    createEventTrace.start();
    var uid = _auth.currentUser?.uid ?? '';

    if (location.length > 50) {
      _state = CreateState.error;
      notifyListeners();
      throw Exception("The event location cannot be longer than 50 characters");
    } else if (RegExp(r'[^a-zA-Z0-9 -]').allMatches(location).isNotEmpty) {
      _state = CreateState.error;
      notifyListeners();
      throw Exception("The event location only accepts letters, numbers, and spaces");
    } else if (sport == null ||
        playersNeeded == null ||
        playersBrought == null ||
        startDateTime == null ||
        duration == null ||
        duration == const Duration() ||
        location == null ||
        location == "") {
      _state = CreateState.error;
      notifyListeners();
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

enum CreateState {
  initial,
  loading,
  success,
  error,
}
