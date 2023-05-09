import 'dart:convert';
import 'dart:math';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/services/cache_manager/fitconnect_cache_manager.dart';
import 'package:fit_connect/utils/connectivity.dart';

import 'package:flutter/material.dart';

class ExerciseListViewModel extends ChangeNotifier {
  bool _isOffline = false;

  final String baseUrl = 'https://api.api-ninjas.com/v1/exercises';

  final List<String> _typeOptions = [
    'Any',
    'Cardio',
    'Olympic Weightlifting',
    'Plyometrics',
    'Powerlifting',
    'Strength',
    'Stretching',
    'Strongman'
  ];

  final List<String> _muscleOptions = [
    'Any',
    'Abdominals',
    'Adductors',
    'Biceps',
    'Calves',
    'Chest',
    'Forearms',
    'Glutes',
    'Hamstrings',
    'Lats',
    'Lower Back',
    'Middle Back',
    'Neck',
    'Quadriceps',
    'Traps',
    'Triceps'
  ];

  final List<String> _difficultyOptions = [
    'Any',
    'Beginner',
    'Intermediate',
    'Expert'
  ];

  String typeFilter = 'Any';
  String muscleFilter = 'Any';
  String difficultyFilter = 'Any';
  ExerciseListState _state = ExerciseListState.loading;

  List<dynamic> _exercises = [];

  bool get isOffline => _isOffline;
  List<dynamic> get exercises => _exercises;
  ExerciseListState get state => _state;

  List<String> get typeOptions => _typeOptions;
  List<String> get muscleOptions => _muscleOptions;
  List<String> get difficultyOptions => _difficultyOptions;

  set state(ExerciseListState value) {
    _state = value;
    notifyListeners();
  }

  ExerciseListViewModel() {
    getExercises(isInit: true);
  }

  Future<void> getExercises({bool isInit = false}) async {
    _state = ExerciseListState.loading;
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
      notifyListeners();
    }

    String url = baseUrl;
    if (difficultyFilter != 'Any') {
      url += '?difficulty=${getApiText(difficultyFilter)}';
    }

    if (typeFilter != 'Any') {
      url += url == baseUrl
          ? '?type=${getApiText(typeFilter)}'
          : '&type=${getApiText(typeFilter)}';
    }
    if (muscleFilter != 'Any') {
      url += url == baseUrl
          ? '&muscle=${getApiText(muscleFilter)}'
          : '&muscle=${getApiText(muscleFilter)}';
    }

    if(difficultyFilter == 'Any' && typeFilter == 'Any' && muscleFilter == 'Any' && !isInit){
      url += '?offset=${Random().nextInt(1000) + 10}';
    }

    final response = await FitConnectCacheManager.getData(
      url,
      {'X-Api-Key': 'XHldlCZ6BtEIIpwW+HaWsg==oMwUs8WRq2HVCxCS'},
    );
    if (response.statusCode == 200) {
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
    } else {
      _state = ExerciseListState.completed;
      notifyListeners();
    }
  }

  List<String> getDisplayList(list) {
    for (var item in list) {
      item = getDisplayText(item);
    }
    return list;
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

  String getApiText(String string) {
    return string.replaceAll(' ', '_').toLowerCase();
  }

  Future<void> checkConnectionFromView() async {
    _isOffline = !await checkConnectivity();
    notifyListeners();
  }
}

enum ExerciseListState {
  loading,
  completed,
  error,
}
