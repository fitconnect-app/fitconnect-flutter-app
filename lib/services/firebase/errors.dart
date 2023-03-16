import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class FirebaseExceptionHelper {
  static String getMessage(BuildContext context, FirebaseAuthException e) {
    switch (e.code) {
      case 'email-already-in-use':
        return "This email is already in use, please use a different one";
      case 'invalid-email':
        return "The email entered is not valid";
      case 'weak-password':
        return "Password must be at least 6 characters";
      case 'user-not-found':
        return "No account associated with this email was found";
      case 'wrong-password':
        return "Incorrect password";
      default:
        return "An error has occurred. Please try again later";
    }
  }
}
