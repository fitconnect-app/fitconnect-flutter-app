import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:flutter/material.dart';

class EventsViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  EventState _state = EventState.loading;
  List<EventModel>? _events;

  EventState get state => _state;

  List<EventModel>? get events => _events;

  EventsViewModel(filter) {
    getEvents(filter).then((_) {
      _state = EventState.completed;
      notifyListeners();
    });
  }

  Future<void> getEvents(String? filter) async {
    _events = await _eventRepository.getEvents(limit: 10, sport: filter);
  }
}

enum EventState {
  loading,
  completed,
  error,
}
