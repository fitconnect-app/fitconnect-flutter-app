import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_splash/flutter_native_splash.dart';

import '/services/firebase/singleton.dart';
import 'services/firebase/config.dart';
import 'theme/style.dart';
import 'utils/routes.dart';


Future<void> main() async {
  WidgetsBinding widgetsBinding = WidgetsFlutterBinding.ensureInitialized();
  FlutterNativeSplash.preserve(widgetsBinding: widgetsBinding);

  await initializeFirebase();
  User? user = FirebaseInstance.auth.currentUser;
  String initialRoute = user == null ? '/auth' : '/home';

  runApp(FitConnectApp(initialRoute: initialRoute));
  FlutterNativeSplash.remove();
}

class FitConnectApp extends StatelessWidget {
  final String initialRoute;

  const FitConnectApp({Key? key, required this.initialRoute}) : super(key: key);

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
