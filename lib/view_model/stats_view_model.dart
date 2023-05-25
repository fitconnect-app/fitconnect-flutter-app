import 'dart:async';

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

class StatsViewModel extends ChangeNotifier {
  final EventRepository _eventRepository = EventRepository();
  final BPMDataRepository _bpmDataRepository = BPMDataRepository();
  StreamController<void> asyncController = StreamController<void>();
  List<EventModel> recentEvents = [];
  List<BPMDataModel> _bpmData = [];
  List<DataStats> bpmAverages = [];
  List<DataStats> mostSearchedSports = [];
  List<DataStats> mostFrequentHours = [];
  List<DataStats> hoursPracticed = [];
  StatsState _bpmState = StatsState.loading;
  StatsState _topSportsState = StatsState.loading;
  StatsState _mostFrequentHoursState = StatsState.loading;
  StatsState _hoursPracticedState = StatsState.loading;
  bool _isOffline = false;

  bool get isOffline => _isOffline;

  StatsState get bpmState => _bpmState;
  StatsState get topSportsState => _topSportsState;
  StatsState get mostFrequentHoursState => _mostFrequentHoursState;
  StatsState get hoursPracticedState => _hoursPracticedState;

  StatsViewModel() {
    Trace statsTrace = FirebasePerformance.instance.newTrace('getMyStats');
    statsTrace.start();
    retrieveStats().then(
      (_) {
        statsTrace.stop();
      },
    );
  }

  void close() {
    asyncController.close();
  }

  Future<void> refreshStats() async {
    Trace refreshStatsTrace =
        FirebasePerformance.instance.newTrace('refreshMyStats');
    refreshStatsTrace.start();
    await retrieveStats();
    refreshStatsTrace.stop();
  }

  Future<void> retrieveStats() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }
    _bpmData = _bpmDataRepository.getRecentBPMData();
    getBPMAverages();
    recentEvents = await _eventRepository.getMostRecentUserEvents(
        FirebaseInstance.auth.currentUser!.uid, _isOffline);
    getTopPlayedSports();
    getMostFrequentHours();
    getHoursPracticed();
  }

  void getBPMAverages() async {
    Map<dynamic, dynamic> averages = {};
    for (final BPMDataModel bpmData in _bpmData) {
      final date = DateUtils.dateOnly(bpmData.date!);
      if (averages.containsKey(date)) {
        averages[date]!.add(bpmData.value!);
      } else {
        averages[date] = [bpmData.value!];
      }
    }
    averages.forEach((key, value) {
      int sum = 0;
      for (final int i in value) {
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
    _bpmState = StatsState.completed;
    if (asyncController.isClosed) {
      return;
    }
    asyncController.add(null);
    notifyListeners();
  }

  void getTopPlayedSports() async {
    Map<dynamic, dynamic> sportCount = {};
    for (final EventModel event in recentEvents) {
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
    _topSportsState = StatsState.completed;
    if (asyncController.isClosed) {
      return;
    }
    asyncController.add(null);
    notifyListeners();
  }

  void getMostFrequentHours() async {
    Map<dynamic, dynamic> hourCount = {};

    for (final EventModel event in recentEvents) {
      final String hour = "${event.startDate.toDate().hour}:00";
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
    _mostFrequentHoursState = StatsState.completed;
    if (asyncController.isClosed) {
      return;
    }
    asyncController.add(null);
    notifyListeners();
  }

  void getHoursPracticed() async {
    Map<dynamic, dynamic> sportHourCount = {};
    String sport = '';
    DateTime startDate;
    DateTime endDate;
    double duration = 0;
    for (final EventModel event in recentEvents) {
      sport = event.sport.getString();
      startDate = event.startDate.toDate();
      endDate = event.endDate.toDate();
      duration = endDate.difference(startDate).inSeconds / 3600;
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
    _hoursPracticedState = StatsState.completed;
    if (asyncController.isClosed) {
      return;
    }
    asyncController.add(null);
    notifyListeners();
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
      ..addAll({for (final key in top5Keys) key: originalMap[key] ?? 0});

    return result;
  }
}
