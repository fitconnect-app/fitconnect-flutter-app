import 'dart:async';
import 'dart:isolate';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/event/event_dto.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/services/geolocalizator/geolocalizator.dart';
import 'package:fit_connect/services/notifications/notifications_service.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';

class EventCreateViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final FirebaseAuth _auth = FirebaseInstance.auth;
  CreateState _state = CreateState.initial;
  bool _isOffline = false;

  CreateState get state => _state;
  bool get isOffline => _isOffline;

  set state(CreateState value) {
    _state = value;
    notifyListeners();
  }

  Future<void> createEvent(sport, playersNeeded, playersBrought, startDateTime,
      duration, location) async {
    Trace createEventTrace =
        FirebasePerformance.instance.newTrace('createEvent');
    createEventTrace.start();
    var uid = _auth.currentUser?.uid ?? '';

    if (location.length > 100) {
      _state = CreateState.error;
      notifyListeners();
      throw const FormatException(
          "The event location cannot be longer than 100 characters");
    } else if (RegExp(r'[^a-zA-Z0-9 .#,\-\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1]')
        .allMatches(location)
        .isNotEmpty) {
      _state = CreateState.error;
      notifyListeners();
      throw const FormatException(
          "The event location only accepts letters, numbers, and spaces");
    } else if (sport == null ||
        playersNeeded == null ||
        playersBrought == null ||
        startDateTime == null ||
        location == null ||
        location == "") {
      _state = CreateState.error;
      notifyListeners();
      throw const FormatException("Event fields cannot be empty");
    } else if (duration == null || duration == const Duration()) {
      _state = CreateState.error;
      notifyListeners();
      throw const FormatException("Duration cannot be empty or 0:0");
    }
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }

    final startDate = Timestamp.fromDate(startDateTime);
    final endDate = Timestamp.fromDate(startDateTime.add(duration));
    final sportName = Sports.values.firstWhere((e) => e.getString() == sport);
    final event = EventModel(
        sport: sportName,
        playersNeeded: playersNeeded,
        playersBrought: playersBrought,
        spotsAvailable: playersNeeded,
        startDate: startDate,
        endDate: endDate,
        participantsIds: <String>[],
        eventOwnerId: uid,
        location: location);
    await _eventRepository.createEvent(EventDTO.fromModel(event));
    createEventTrace.stop();

    if (!_isOffline) {
      Position position;
      try {
        position = await determinePosition();
      } catch (e) {
        return;
      }

      // Create isolate for fetching humidity
      final receivePort = ReceivePort();
      final isolate = await Isolate.spawn(
        getHumidity,
        {
          'sendPort': receivePort.sendPort,
          'startDateTime': startDateTime,
          'latitude': position.latitude,
          'longitude': position.longitude,
        },
      );

      // Listen for humidity value from isolate
      receivePort.listen((humidity) {
        if (humidity != null && humidity) {
          NotificationService.showNotification(
              title: "Weather Forecast",
              body:
                  "There's a probability that your ${sportName.getString().toLowerCase()} event will have rain");
        }
      });

      // Cancel isolate if it doesn't finish within 10 seconds
      Future.delayed(const Duration(seconds: 10), () {
        isolate.kill(priority: Isolate.immediate);
        receivePort.close();
      });
    }
  }

  Future<void> saveFormData(
    String? selectedSport,
    int? selectedPlayerCount,
    int? broughtPlayerCount,
    DateTime? selectedDateTime,
    Duration? duration,
    String location,
  ) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('selectedSport', selectedSport ?? '');
    prefs.setInt('selectedPlayerCount', selectedPlayerCount ?? 0);
    prefs.setInt('broughtPlayerCount', broughtPlayerCount ?? 0);
    prefs.setString(
        'selectedDateTime', selectedDateTime?.toIso8601String() ?? '');
    prefs.setString('duration', duration?.inSeconds.toString() ?? '');
    prefs.setString('location', location);
  }

  Future<Map<String, dynamic>> loadFormData() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'selectedSport': prefs.getString('selectedSport') ?? '',
      'selectedPlayerCount': prefs.getInt('selectedPlayerCount') ?? 0,
      'broughtPlayerCount': prefs.getInt('broughtPlayerCount') ?? 0,
      'selectedDateTime': DateTime.now().toIso8601String(),
      'duration': prefs.getString('duration') ?? '',
      'location': prefs.getString('location') ?? '',
    };
  }
  Future<void> checkConnectionFromView() async {
    _isOffline = !await checkConnectivity();
    notifyListeners();
  }
}

enum CreateState {
  initial,
  loading,
  success,
  error,
}

// The getHumidity function for the isolate
void getHumidity(Map<String, dynamic> args) async {
  SendPort sendPort = args['sendPort'];
  DateTime dateTime = args['startDateTime'];
  double latitude = args['latitude'];
  double longitude = args['longitude'];

  const String apiKey = '3db658571158dea7845186f549b77f21';

  String lat = latitude.toString();
  String lon = longitude.toString();

  String url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=$lat&lon=$lon&appid=$apiKey&units=metric';

  http.Response response = await http.get(Uri.parse(url));
  if (response.statusCode == 200) {
    Map<String, dynamic> data = jsonDecode(response.body);
    List<dynamic> forecasts = data['list'];

    for (final forecast in forecasts) {
      DateTime forecastDateTime = DateTime.parse(forecast['dt_txt']);
      if (forecastDateTime.year == dateTime.year &&
          forecastDateTime.month == dateTime.month &&
          forecastDateTime.day == dateTime.day &&
          forecastDateTime.hour >= dateTime.hour) {
        sendPort.send(forecast['weather'][0]['main'] == "Rain" ? true : false);
        return;
      }
    }

    sendPort.send(null);
  }
}

