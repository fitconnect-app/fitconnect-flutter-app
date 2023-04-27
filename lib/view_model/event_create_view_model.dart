import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

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
      throw const FormatException(
          "The event location cannot be longer than 50 characters");
    } else if (RegExp(r'[^a-zA-Z0-9 \-\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1]')
        .allMatches(location)
        .isNotEmpty) {
      _state = CreateState.error;
      notifyListeners();
      throw const FormatException(
          "The event location only accepts letters, numbers, and spaces");
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
      throw const FormatException("Event fields cannot be empty");
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

  Future<void> saveFormData(
    String? selectedSport,
    int? selectedPlayerCount,
    int? broughtPlayerCount,
    DateTime? selectedDateTime,
    Duration? duration,
    String location,
  ) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('selectedSport', selectedSport ?? '');
    prefs.setInt('selectedPlayerCount', selectedPlayerCount ?? 0);
    prefs.setInt('broughtPlayerCount', broughtPlayerCount ?? 0);
    prefs.setString(
        'selectedDateTime', selectedDateTime?.toIso8601String() ?? '');
    prefs.setString('duration', duration?.inSeconds.toString() ?? '');
    prefs.setString('location', location);
  }

  Future<Map<String, dynamic>> loadFormData() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'selectedSport': prefs.getString('selectedSport') ?? '',
      'selectedPlayerCount': prefs.getInt('selectedPlayerCount') ?? 0,
      'broughtPlayerCount': prefs.getInt('broughtPlayerCount') ?? 0,
      'selectedDateTime': prefs.getString('selectedDateTime') ?? '',
      'duration': prefs.getString('duration') ?? '',
      'location': prefs.getString('location') ?? '',
    };
  }
}

enum CreateState {
  initial,
  loading,
  success,
  error,
}
