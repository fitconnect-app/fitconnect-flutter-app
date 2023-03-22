import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class ProfileViewModel extends ChangeNotifier {
  final User? _user = FirebaseInstance.auth.currentUser;
  UserData _userData = UserDataRepository();

  void getProfile(String userId) async {
    _userData = await _userDataRepository.getUserData(_user?.uid);
    notifyListeners();
  }
}

enum ProfileState {
  loading,
  completed,
  error,
}
