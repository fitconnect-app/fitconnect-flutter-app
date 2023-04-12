import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/bpm/bpm_model.dart';
import 'package:fit_connect/model/bpm/bpm_repository.dart';
import 'package:fit_connect/model/event/event_model.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:fit_connect/utils/connectivity.dart';
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
  final BPMDataRepository _bpmDataRepository = BPMDataRepository();
  List<EventModel> recentEvents = [];
  List<BPMDataModel> _bpmData = [];
  List<DataStats> bpmAverages = [];
  List<DataStats> mostSearchedSports = [];
  List<DataStats> mostFrequentHours = [];
  List<DataStats> hoursPracticed = [];
  StatsState _state = StatsState.loading;
  bool _isOffline = false;

  bool get isOffline => _isOffline;

  StatsState get state => _state;

  MyPersonalStatisticsViewModel() {
    Trace statsTrace = FirebasePerformance.instance.newTrace('getMyStats');
    statsTrace.start();
    _state = StatsState.completed;
    retrieveStats().then(
      (_) {
        notifyListeners();
        statsTrace.stop();
      },
    );
  }

  Future<void> refreshStats() async {
    Trace refreshStatsTrace =
        FirebasePerformance.instance.newTrace('refreshMyStats');
    refreshStatsTrace.start();
    await retrieveStats();
    _state = StatsState.completed;
    notifyListeners();
    refreshStatsTrace.stop();
  }

  Future<void> retrieveStats() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }
    recentEvents = await _eventRepository
        .getMostRecentUserEvents(FirebaseInstance.auth.currentUser!.uid);
    _bpmData = _bpmDataRepository.getRecentBPMData();
    getBPMAverages();
    getTopPlayedSports();
    getMostFrequentHours();
    getHoursPracticed();
  }

  void getBPMAverages() {
    Map<dynamic, dynamic> averages = {};
    for (BPMDataModel bpmData in _bpmData) {
      var date = DateUtils.dateOnly(bpmData.date!);
      if (averages.containsKey(date)) {
        averages[date]!.add(bpmData.value!);
      } else {
        averages[date] = [bpmData.value!];
      }
    }
    averages.forEach((key, value) {
      int sum = 0;
      for (int i in value) {
        sum += i;
      }
      averages[key] = sum ~/ value.length;
    });
    averages = sortMapByValueAndOrder(averages);
    bpmAverages = List.generate(
      averages.length > 5 ? 5 : averages.length,
      (index) {
        var datetime = averages.keys.elementAt(index);
        return DataStats(
          id: index,
          label: "${datetime.day}/${datetime.month}",
          yValue: averages.values.elementAt(index).toDouble(),
          color: Colors.red,
        );
      },
    );
  }

  void getTopPlayedSports() {
    Map<dynamic, dynamic> sportCount = {};
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
    Map<dynamic, dynamic> hourCount = {};

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
    Map<dynamic, dynamic> sportHourCount = {};
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

  Map<dynamic, dynamic> sortMapByValueAndOrder(
      Map<dynamic, dynamic> originalMap) {
    if (originalMap.isEmpty) {
      return originalMap;
    }

    var top5Keys = originalMap.keys.toList()
      ..sort((a, b) => originalMap[b]!.compareTo(originalMap[a] as num));
    top5Keys = top5Keys.sublist(0, top5Keys.length < 5 ? top5Keys.length : 5);

    var result = SplayTreeMap<dynamic, dynamic>.from(originalMap)
      ..removeWhere((key, value) => !top5Keys.contains(key))
      ..removeWhere((key, value) => value < top5Keys.length)
      ..addAll({for (var key in top5Keys) key: originalMap[key] ?? 0});

    return result;
  }
}
