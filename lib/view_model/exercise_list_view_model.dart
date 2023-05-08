import 'dart:convert';

import 'package:fit_connect/model/shared/sports.dart';
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
    var data = jsonDecode(response.body);
    for (var exercise in data) {
      exercise['imgUrl'] = getImgUrl(exercise['type']);
      exercise['type'] = getDisplayText(exercise['type']);
      exercise['muscle'] = getDisplayText(exercise['muscle']);
      exercise['difficulty'] = getDisplayText(exercise['difficulty']);
    }
    _exercises = data;
    _state = ExerciseListState.completed;
    notifyListeners();
  }

  String getImgUrl(String exerciseType) {
    switch (exerciseType) {
      case "stretching":
        return "https://i.ibb.co/FHN3tB1/stretching.jpg";
      case "cardio":
        return "https://i.ibb.co/BsNPL6v/cardio.jpg";
      case "olympic_weightlifting":
        return "https://i.ibb.co/p2CFfBz/Olympic-Lift.jpg";
      case "powerlifting":
        return "https://i.ibb.co/vYSGPkg/powerlifting.jpg";
      case "plyometrics":
        return "https://i.ibb.co/n0Lb8LJ/plyometric.jpg";
      case "strength":
        return "https://i.ibb.co/GpSnqPC/strength.jpg";
      case "strongman":
        return "https://i.ibb.co/0MH9QtG/strongman.jpg";
      default:
        return "https://i.ibb.co/LSRbK6B/default-Exercise.jpg";
    }
  }

  String getDisplayText(String string) {
    return string.replaceAll('_', ' ').capitalize();
  }
}

enum ExerciseListState {
  loading,
  completed,
  error,
}
