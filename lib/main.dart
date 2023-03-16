import 'package:firebase_auth/firebase_auth.dart';
import 'package:fit_connect/routes.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/model/config/firebase_singleton.dart';
import 'package:flutter/material.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await FirebaseInstance.app;
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
