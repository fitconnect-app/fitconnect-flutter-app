import 'dart:async';

import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AutoreloadService {
  static late SharedPreferences preferences;

  final StreamController<String> _eventStreamController =
      StreamController.broadcast();

  Stream<String> get eventStream =>
      _eventStreamController.stream;

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
    List<EventModel> initialEvents = await eventRepository.getEvents(
      getCache: isOffline,
    );
    int initialEventCount = initialEvents.length;

    while (true) {
              await Future.delayed(const Duration(seconds: 10));

      bool isOffline = !await checkConnectivity();
      List<EventModel> currentEvents = await eventRepository.getEvents(
        getCache: isOffline,
      );
      int currentEventCount = currentEvents.length;

      if (currentEventCount > initialEventCount + 2) {
        // Send notification asking the user to reload the list of events
        _eventStreamController.add("new-events-available");
        break;
      }

      initialEvents = currentEvents.take(3).toList();
      initialEventCount = initialEvents.length;
    }
  }

  void dispose() {
    _eventStreamController.close();
  }
}
