import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/user/user_dto.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';

class AuthViewModel extends ChangeNotifier {
  final FirebaseAuth _auth = FirebaseInstance.auth;
  final UserRepository _userRepository = UserRepository();
  bool _isOffline = false;

  bool get isOffline => _isOffline;

  Future<void> login(email, password) async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
      notifyListeners();
      Trace loginTrace = FirebasePerformance.instance.newTrace('login');
      loginTrace.start();
      await _auth.signInWithEmailAndPassword(email: email, password: password);
      loginTrace.stop();
    }
  }

  Future<void> signup(firstName, lastName, email, password) async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
      Trace signupTrace = FirebasePerformance.instance.newTrace('signup');
      _filterInvalidCharacters(firstName, 'First name');
      _filterInvalidCharacters(lastName, 'Last name');
      signupTrace.start();
      await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      // Store user in Firestore
      var uid = _auth.currentUser?.uid ?? '';
      final user = UserModel(
        id: uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        profilePicture:
            'https://api.dicebear.com/5.x/bottts-neutral/png?seed=$firstName$lastName',
        fitconnectPoints: 0,
        eventStreak: 0,
        achievementsIDs: <String>[],
      );
      await _userRepository.createUser(UserDTO.fromModel(user));
      signupTrace.stop();
    }
  }

  void _filterInvalidCharacters(String input, String fieldName) {
    if (input.length > 50) {
      throw FormatException("$fieldName cannot be longer than 50 characters");
    } else if (RegExp(r'[^a-zA-Z0-9 \-\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1]')
        .allMatches(input)
        .isNotEmpty) {
      throw FormatException(
          "$fieldName only accepts letters, numbers, and spaces");
    }
  }
}
