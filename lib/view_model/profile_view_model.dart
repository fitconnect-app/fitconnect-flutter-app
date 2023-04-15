import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';

class ProfileViewModel extends ChangeNotifier {
  final User? _user = FirebaseInstance.auth.currentUser;
  final UserRepository _userRepository = UserRepository();
  ProfileState _state = ProfileState.loading;
  UserModel? _userData;
  bool _isOffline = false;

  UserModel? get userData => _userData;

  ProfileState get state => _state;

  bool get isOffline => _isOffline;

  ProfileViewModel() {
    getProfile().then((_) {
      _state = ProfileState.completed;
      notifyListeners();
    });
  }

  Future<void> retrieveProfile() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
    }
    _userData = await _userRepository.getUser(_user?.uid ?? '', _isOffline);
    await _userData?.getAchievements(_isOffline);
  }

  Future<void> getProfile() async {
    Trace profileTrace = FirebasePerformance.instance.newTrace('getProfile');
    profileTrace.start();
    await retrieveProfile();
    profileTrace.stop();
    notifyListeners();
  }

  Future<void> refreshProfile() async {
    Trace profileTrace =
        FirebasePerformance.instance.newTrace('refreshProfile');
    profileTrace.start();
    await retrieveProfile();
    profileTrace.stop();
    notifyListeners();
  }
}

enum ProfileState {
  loading,
  completed,
  error,
}
