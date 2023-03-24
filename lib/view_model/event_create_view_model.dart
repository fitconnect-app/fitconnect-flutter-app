import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:flutter/material.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class EventViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;
  Future<void> createEvent(sport, playersNeeded, playersBrought, startDateTime,
      duration, location) async {
    var uid = _auth.currentUser?.uid ?? '';
    final startDate = Timestamp.fromDate(startDateTime);
    final endDate = Timestamp.fromDate(startDateTime.add(duration));
    final event = EventModel(
        sport: sport,
        playersNeeded: playersNeeded,
        playersBrought: playersBrought,
        spotsAvailable: playersNeeded,
        startDate: startDate,
        endDate: endDate,
        participants: <String>[],
        eventOwner: uid,
        location: location);
    await _eventRepository.createEvent(EventDTO.fromModel(event));
  }
}
