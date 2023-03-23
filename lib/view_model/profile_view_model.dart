import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

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
    }
    );
  }

  Future<void> getProfile() async {
    _userData = await _userRepository.getUser(_user?.uid ?? '');
    await _userData?.getAchievements();
  }
}

enum ProfileState {
  loading,
  completed,
  error,
}
