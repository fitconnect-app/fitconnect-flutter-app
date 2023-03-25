import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';

class ProfileViewModel extends ChangeNotifier {
  final User? _user = FirebaseInstance.auth.currentUser;
  final UserRepository _userRepository = UserRepository();
  ProfileState _state = ProfileState.loading;
  UserModel? _userData;

  UserModel? get userData => _userData;

  ProfileState get state => _state;

  ProfileViewModel() {
    getProfile().then((_) {
      _state = ProfileState.completed;
      notifyListeners();
    });
  }

  Future<void> getProfile() async {
    Trace profileTrace = FirebasePerformance.instance.newTrace('getProfile');
    profileTrace.start();
    _userData = await _userRepository.getUser(_user?.uid ?? '');
    await _userData?.getAchievements();
    profileTrace.stop();
  }
}

enum ProfileState {
  loading,
  completed,
  error,
}
