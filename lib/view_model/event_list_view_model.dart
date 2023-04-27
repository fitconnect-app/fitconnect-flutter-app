import 'dart:async';

import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/foundation.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class EventsListViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  EventState _state = EventState.loading;
  List<EventModel>? _events;
  var _filter = '';
  bool _isOffline = false;
  String _currentTime = '';
  Timer? _timer;

  EventState get state => _state;

  List<EventModel>? get events => _events;

  bool get isOffline => _isOffline;

  String get currentTime => _currentTime;

  EventsListViewModel(String? filter) {
    _filter = filter ?? '';
    getEvents(filter).then((_) {
      _state = EventState.completed;
      notifyListeners();
    });
    getCurrentTime();
    initTimer();
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
    _events = await _eventRepository.getEvents(
      limit: 10,
      sport: filter,
      getCache: _isOffline,
    );
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
        : await _eventRepository.getEvents(
            limit: 10,
            sport: _filter,
            getCache: _isOffline,
          );
    eventListTrace.stop();
    getCurrentTime();
    notifyListeners();
  }

  void initTimer() {
    // Set up a timer to update the current time every minute
    _timer = Timer.periodic(const Duration(minutes: 1), (_) {
      getCurrentTime();
    });
  }

  void cancelTimer() {
    _timer?.cancel();
  }

  void getCurrentTime() async {
    try {
      final response = await http.get(
        Uri.parse('http://worldtimeapi.org/api/ip'),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final datetime = data['datetime'];
        var hour = int.parse(datetime.substring(11, 13));
        final minute = datetime.substring(14, 16);
        String amPm = '';
        if (hour >= 12) {
          amPm = 'PM';
          hour -= 12;
        } else {
          amPm = 'AM';
        }
        if (hour == 0) {
          hour = 12;
        }
        _currentTime = '$hour:$minute $amPm';
        notifyListeners();
      } else {
        throw Exception('Failed to load data of current time');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error: $e');
      }
    }
  }
}

enum EventState {
  loading,
  completed,
  error,
}
