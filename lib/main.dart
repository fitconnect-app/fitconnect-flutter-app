import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '/services/firebase/singleton.dart';
import 'services/firebase/config.dart';
import 'theme/style.dart';
import 'utils/routes.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initializeFirebase();

  User? user = FirebaseInstance.auth.currentUser;
  String initialRoute = user == null ? '/auth' : '/home';

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
