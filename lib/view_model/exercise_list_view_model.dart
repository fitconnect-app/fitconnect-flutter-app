import 'dart:convert';

import 'package:fit_connect/services/cache_manager/fitconnect_cache_manager.dart';
import 'package:fit_connect/utils/connectivity.dart';

import 'package:flutter/material.dart';

class ExerciseListViewModel extends ChangeNotifier {
  bool _isOffline = false;

  String baseUrl = 'https://api.api-ninjas.com/v1/exercises';

  String? typeFilter;
  String? muscleFilter;
  String? difficultyFilter;
  ExerciseListState _state = ExerciseListState.loading;

  List<dynamic> _exercises = [];

  bool get isOffline => _isOffline;
  List<dynamic> get exercises => _exercises;
  ExerciseListState get state => _state;

  ExerciseListViewModel() {
    getExercises();
  }

  Future<void> getExercises() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
      notifyListeners();
    }

    String url = baseUrl;
    if (typeFilter != null) {
      url += '?type=$typeFilter';
    }
    if (muscleFilter != null) {
      url += '?muscle=$muscleFilter';
    }
    if (difficultyFilter != null) {
      url += '?difficulty=$difficultyFilter';
    }

    if (url == baseUrl) {
      url += '?difficulty=beginner';
    }

    final response = await FitConnectCacheManager.getData(
      url,
      {'X-Api-Key': 'XHldlCZ6BtEIIpwW+HaWsg==oMwUs8WRq2HVCxCS'},
    );
    final data = jsonDecode(response.body);
    _exercises = data;
    _state = ExerciseListState.completed;
    notifyListeners();
  }
}

enum ExerciseListState {
  loading,
  completed,
  error,
}
