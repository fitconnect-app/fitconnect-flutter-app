import 'package:fit_connect/screens/auth/auth.dart';
import 'package:fit_connect/screens/profile/profile.dart';
import 'package:flutter/widgets.dart';

// import 'package:fit_connect/screens/account/account.dart';
// import 'package:fit_connect/screens/events/events.dart';
// import 'package:fit_connect/screens/start/start.dart';

final Map<String, WidgetBuilder> routes = <String, WidgetBuilder>{
  "/auth": (BuildContext context) => const AuthScreen(),
  "/profile": (BuildContext context) => const ProfileScreen(),
  // TODO: "/events": (BuildContext context) => const EventsScreen(),
  // TODO: "/account": (BuildContext context) => const AccountScreen(),
  // TODO: "/account-edit": (BuildContext context) => AccountEditScreen(),
};
