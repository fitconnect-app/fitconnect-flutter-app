import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';

class EventsListViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  EventState _state = EventState.loading;
  List<EventModel>? _events;
  var _filter = '';
  bool _isOffline = false;

  EventState get state => _state;

  List<EventModel>? get events => _events;

  bool get isOffline => _isOffline;

  EventsListViewModel(String? filter) {
    _filter = filter ?? '';
    getEvents(filter).then((_) {
      _state = EventState.completed;
      notifyListeners();
    });
  }

  Future<void> getEvents(String? filter) async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }
    Trace eventListTrace =
        FirebasePerformance.instance.newTrace('getEventList');
    eventListTrace.start();
    _events =
        await _eventRepository.getEvents(limit: 10, sport: filter, getCache: _isOffline);
    eventListTrace.stop();
  }

  Future<void> refreshEvents() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }
    Trace eventListTrace =
        FirebasePerformance.instance.newTrace('refreshEventList');
    eventListTrace.start();
    _events = _filter.isEmpty
        ? await _eventRepository.getEvents(limit: 10, getCache: _isOffline)
        : await _eventRepository.getEvents(limit: 10, sport: _filter, getCache: _isOffline);
    eventListTrace.stop();
    notifyListeners();
  }
}

enum EventState {
  loading,
  completed,
  error,
}
