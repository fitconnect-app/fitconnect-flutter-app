import 'dart:async';

import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AutoreloadService {
  var _filter = '';
  static late SharedPreferences preferences;
  static final StreamController<String> _eventStreamController =
      StreamController.broadcast();

  StreamController<String> get eventStreamController => _eventStreamController;

  Stream<String> get eventStream => _eventStreamController.stream;

  AutoreloadService(String? filter) {
    _filter = filter ?? '';
  }

  void init() async {
    SharedPreferences.getInstance().then(
      (prefs) {
        preferences = prefs;
        bool eventAutoreloadPreference =
            preferences.getBool("eventAutoreload") ?? true;
        if (eventAutoreloadPreference) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            _startListeningForNewEvents();
          });
        }
      },
    );
  }

  void _startListeningForNewEvents() async {
    final EventRepository eventRepository = EventRepository();
    bool isOffline = !await checkConnectivity();
    EventModel? lastEvent = await eventRepository.getLastEvent(
      getCache: isOffline,
      sport: _filter,
    );
    String? lastEventID = lastEvent?.id;

    while (true) {
      await Future.delayed(const Duration(seconds: 10));

      bool isOffline = !await checkConnectivity();
      EventModel? currentLastEvent = await eventRepository.getLastEvent(
        getCache: isOffline,
        sport: _filter,
      );
      String? currentLastEventID = currentLastEvent?.id;

      if (currentLastEventID != lastEventID) {
        // Send data for reloading the list of events
        _eventStreamController.add("new-events-available");
      }

      lastEventID = currentLastEventID;
    }
  }

  void dispose() {
    _eventStreamController.close();
  }
}
