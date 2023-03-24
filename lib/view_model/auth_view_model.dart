import 'package:firebase_auth/firebase_auth.dart';
import 'package:fit_connect/model/user/user_dto.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';

class AuthViewModel extends ChangeNotifier {
  final FirebaseAuth _auth = FirebaseInstance.auth;
  final UserRepository _userRepository = UserRepository();

  Future<void> login(email, password) async {
    await _auth.signInWithEmailAndPassword(email: email, password: password);
  }

  Future<void> signup(firstName, lastName, email, password) async {
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
  }
}
