import 'dart:ui';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:flutter/material.dart';
import 'model/config/firebase_singleton.dart';
import 'routes.dart';
import 'theme/style.dart';

Future<FirebaseApp> initializeFirebase() async {
  // Firebase initialization
  FirebaseApp app = await FirebaseInstance.app;

  // Pass all normal uncaught errors to Crashlytics.
  FlutterError.onError = (errorDetails) {
    FirebaseCrashlytics.instance.recordFlutterFatalError(errorDetails);
  };
  // Pass all uncaught asynchronous errors that aren't handled by the Flutter framework to Crashlytics
  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
    return true;
  };
  return app;
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeFirebase();

  User? user = FirebaseInstance.auth.currentUser;
  String initialRoute = '/auth';
  // TODO: String initialRoute = user == null ? '/signup' : '/home';

  // Run app
  runApp(MyApp(initialRoute: initialRoute));
}

class MyApp extends StatelessWidget {
  final String initialRoute;

  const MyApp({Key? key, required this.initialRoute}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitConnect',
      theme: appTheme(),
      initialRoute: initialRoute,
      routes: routes,
    );
  }
}
