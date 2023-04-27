import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';
import 'package:fit_connect/utils/connectivity.dart';

enum EventDetailState { loading, completed, error }

class EventDetailViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;
  EventDetailState _state = EventDetailState.loading;
  EventModel? _event;
  bool _hasJoined = false;
  bool _isOwner = false;
  bool _isJoiningOrLeaving = false;
  bool _isOffline = false;

  EventDetailState get state => _state;

  bool get isJoiningOrLeaving => _isJoiningOrLeaving;

  EventModel? get event => _event;

  bool get hasJoined => _hasJoined;

  bool get isOwner => _isOwner;

  bool get isOffline => _isOffline;

  set isJoiningOrLeaving(bool value) {
    _isJoiningOrLeaving = value;
    notifyListeners();
  }

  EventDetailViewModel(id) {
    getEvent(id).then((_) {
      _state = EventDetailState.completed;
      notifyListeners();
    });
  }

  Future<void> getEvent(id) async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }
    Trace eventTrace = FirebasePerformance.instance.newTrace('getEvent');
    eventTrace.start();
    _event = await _eventRepository.getEvent(id, _isOffline);
    await _event?.getOwner(_isOffline);
    await _event?.getParticipants(_isOffline);
    eventTrace.stop();
    _hasJoined = _event!.participantsIds.contains(_auth.currentUser?.uid);
    _isOwner = _event!.eventOwnerId == _auth.currentUser?.uid;
  }

  Future<void> joinEvent() async {
    var uid = _auth.currentUser?.uid ?? '';
    if (!await checkConnectivity()) {
      _isJoiningOrLeaving = false;
      _isOffline = true;
      notifyListeners();
      return;
    }
    if (_event!.participantsIds.contains(uid)) {
      throw Exception("You already joined this event!");
    } else if (_event!.eventOwnerId == uid) {
      throw Exception("You cannot join your own event!");
    }
    await _event?.addParticipant(uid);
    _isJoiningOrLeaving = false;
    notifyListeners();
  }

  Future<void> leaveEvent() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      _isJoiningOrLeaving = false;
      notifyListeners();
      return;
    }
    var uid = _auth.currentUser?.uid ?? '';
    await _event?.removeParticipant(uid);
    _isJoiningOrLeaving = false;
    notifyListeners();
  }

  Future<void> checkConnection() async {
    _isOffline = !await checkConnectivity();
    notifyListeners();
  }
}
