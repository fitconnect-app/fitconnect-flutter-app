import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'dart:collection';

class DataStats {
  final int id;
  final String label;
  final double yValue;
  final Color color;

  DataStats(
      {required this.id,
      required this.label,
      required this.yValue,
      required this.color});
}

enum StatsState { loading, completed, error }

class MyPersonalStatisticsViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  List<EventModel> recentEvents = [];
  List<DataStats> mostSearchedSports = [];
  List<DataStats> mostFrequentHours = [];
  List<DataStats> hoursPracticed = [];
  StatsState _state = StatsState.loading;

  StatsState get state => _state;

  MyPersonalStatisticsViewModel() {
    _eventRepository
        .getMostRecentUserEvents(FirebaseInstance.auth.currentUser!.uid)
        .then((value) {
      recentEvents = value;
      getTopPlayedSports();
      getMostFrequentHours();
      getHoursPracticed();
      _state = StatsState.completed;
      notifyListeners();
    });
  }

  void getTopPlayedSports() {
    Map<String, double> sportCount = {};
    for (EventModel event in recentEvents) {
      if (sportCount.containsKey(event.sport.getString())) {
        sportCount[event.sport.getString()] =
            sportCount[event.sport.getString()]! + 1;
      } else {
        sportCount[event.sport.getString()] = 1;
      }
    }
    sportCount = sortMapByValueAndOrder(sportCount);
    mostSearchedSports = List.generate(
      sportCount.length > 5 ? 5 : sportCount.length,
      (index) => DataStats(
        id: index,
        label: sportCount.keys.elementAt(index),
        yValue: sportCount.values.elementAt(index).toDouble(),
        color: lightColorScheme.primary,
      ),
    );
  }

  void getMostFrequentHours() {
    Map<String, double> hourCount = {};

    for (EventModel event in recentEvents) {
      String hour = "${event.startDate.toDate().hour}:00";
      if (hourCount.containsKey(hour)) {
        hourCount[hour] = hourCount[hour]! + 1;
      } else {
        hourCount[hour] = 1;
      }
    }

    hourCount = sortMapByValueAndOrder(hourCount);

    mostFrequentHours = List.generate(
      hourCount.length > 5 ? 5 : hourCount.length,
      (index) => DataStats(
        id: index,
        label: hourCount.keys.elementAt(index),
        yValue: hourCount.values.elementAt(index).toDouble(),
        color: lightColorScheme.secondary,
      ),
    );
  }

  void getHoursPracticed() {
    Map<String, double> sportHourCount = {};
    for (EventModel event in recentEvents) {
      String sport = event.sport.getString();
      DateTime startDate = event.startDate.toDate();
      DateTime endDate = event.endDate.toDate();
      double duration = endDate.difference(startDate).inSeconds / 3600;
      if (sportHourCount.containsKey(sport)) {
        sportHourCount[sport] = sportHourCount[sport]! + duration;
      } else {
        sportHourCount[sport] = duration;
      }
    }

    sportHourCount = sortMapByValueAndOrder(sportHourCount);
    hoursPracticed = List.generate(
      sportHourCount.length > 5 ? 5 : sportHourCount.length,
      (index) => DataStats(
        id: index,
        label: sportHourCount.keys.elementAt(index),
        yValue: double.parse(
            sportHourCount.values.elementAt(index).toStringAsFixed(3)),
        color: lightColorScheme.tertiary,
      ),
    );
  }

  Map<String, double> sortMapByValueAndOrder(Map<String, double> originalMap) {
    if (originalMap.isEmpty) {
      return originalMap;
    }
    var sortedMap = SplayTreeMap<dynamic, dynamic>();
    sortedMap.addAll(originalMap);

    var top5Keys = originalMap.keys.toList()
      ..sort((a, b) => originalMap[b]!.compareTo(originalMap[a] as num));
    top5Keys = top5Keys.sublist(0, 5);

    var result = SplayTreeMap<String, double>.from(originalMap)
      ..removeWhere((key, value) => !top5Keys.contains(key))
      ..removeWhere((key, value) => value < top5Keys.length)
      ..addAll({for (var key in top5Keys) key: originalMap[key] ?? 0});

    return result;
  }
}
