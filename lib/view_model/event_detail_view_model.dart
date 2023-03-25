import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:flutter/material.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

enum EventDetailState { loading, completed, error }

class EventDetailViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;
  EventDetailState _state = EventDetailState.loading;
  EventModel? _event;

  EventDetailState get state => _state;
  EventModel? get event => _event;
  EventDetailViewModel(id) {
    getEvent(id).then((_) {
      _state = EventDetailState.completed;
      notifyListeners();
    });
  }

  Future<void> getEvent(id) async {
    _event = await _eventRepository.getEvent(id);
    await _event?.getOwner();
    await _event?.getParticipants();
  }

  Future<void> joinEvent() async {
    var uid = _auth.currentUser?.uid ?? '';
    if (_event!.participantsIds.contains(uid)) {
      throw Exception("You already joined this event!");
    } else if (_event!.eventOwnerId == uid){
      throw Exception("You cannot join your own event!");
    }
    await _event?.addParticipant(uid);
    notifyListeners();
  }
}
