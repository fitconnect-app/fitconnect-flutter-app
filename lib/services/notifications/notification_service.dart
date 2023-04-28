import 'dart:isolate';

import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../firebase/config.dart';

class NotificationService {
  static late SharedPreferences preferences;
  static final EventRepository eventRepository = EventRepository();
  RootIsolateToken rootIsolateToken = RootIsolateToken.instance!;

  void init(receivePort) {
    SharedPreferences.getInstance().then(
      (prefs) {
        preferences = prefs;
        bool listEventsNotificationPreference =
            preferences.getBool("listEventsNotifications") ?? true;
        Isolate.spawn(
          sendNewEventNotifications,
          [receivePort.sendPort, listEventsNotificationPreference],
        );
      },
    );
  }

  void sendNewEventNotifications(List<dynamic> args) async {
    BackgroundIsolateBinaryMessenger.ensureInitialized(rootIsolateToken);
    await initializeFirebase();

    SendPort sendPort = args[0];
    bool listEventsNotificationPreference = args[1];
    if (listEventsNotificationPreference) {
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
          sendPort.send("new-events-available");
          break;
        }

        initialEvents = currentEvents.take(3).toList();
        initialEventCount = initialEvents.length;
      }
    }
  }
}
