import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class FirebaseExceptionHelper {
  static String getMessage(BuildContext context, FirebaseAuthException e) {
    switch (e.code) {
      case 'email-already-in-use':
        return "Este correo ya se encuentra en uso, por favor use uno diferente";
      case 'invalid-email':
        return "El correo ingresado no es válido";
      case 'weak-password':
        return "La contraseña debe tener al menos 6 caracteres";
      case 'user-not-found':
        return "No se encontró una cuenta asociada a este correo";
      case 'wrong-password':
        return "Contraseña incorrecta";
      default:
        return "Ha ocurrido un error. Por favor inténtalo de nuevo más tarde";
    }
  }
}
