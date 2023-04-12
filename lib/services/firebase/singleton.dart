import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:fit_connect/services/firebase/firebase_options.dart';

class FirebaseInstance {
  static FirebaseApp? _appInstance;
  static FirebaseFirestore? _firestoreInstance;
  static FirebaseAuth? _authInstance;

  static Future<FirebaseApp> get initializeApp async {
    _appInstance ??= await Firebase.initializeApp(
        options: DefaultFirebaseOptions.currentPlatform);
    return _appInstance!;
  }

  static FirebaseFirestore get firestore {
    if (_firestoreInstance == null) {
      _firestoreInstance = FirebaseFirestore.instance;
      _firestoreInstance!.settings = const Settings(persistenceEnabled: true);
    }
    return _firestoreInstance!;
  }

  static FirebaseAuth get auth {
    _authInstance ??= FirebaseAuth.instance;
    return _authInstance!;
  }
}
