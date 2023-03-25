import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:flutter/material.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:firebase_auth/firebase_auth.dart';

enum EventDetailState { loading, completed, error }

class EventDetailViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;
  EventDetailState _state = EventDetailState.loading;
  EventModel? _event;
  bool _hasJoined = false;
  bool _isOwner = false;

  EventDetailState get state => _state;
  EventModel? get event => _event;
  bool get hasJoined => _hasJoined;
  bool get isOwner => _isOwner;

  EventDetailViewModel(id) {
    getEvent(id).then((_) {
      _state = EventDetailState.completed;
      _hasJoined = _event!.participantsIds.contains(_auth.currentUser?.uid);
      _isOwner = _event!.eventOwnerId == _auth.currentUser?.uid;
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
    } else if (_event!.eventOwnerId == uid) {
      throw Exception("You cannot join your own event!");
    }
    await _event?.addParticipant(uid);
    notifyListeners();
  }

    Future<void> leaveEvent() async {
    var uid = _auth.currentUser?.uid ?? '';
    await _event?.removeParticipant(uid);
    notifyListeners();
  }

}
