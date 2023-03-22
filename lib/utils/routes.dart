import 'package:fit_connect/screens/auth/auth_screen.dart';
import 'package:fit_connect/screens/bpm/bpm_screen.dart';
import 'package:fit_connect/screens/home/home_screen.dart';
import 'package:fit_connect/screens/stats/stats_screen.dart';
import 'package:flutter/widgets.dart';

// import 'package:fit_connect/screens/account/account.dart';
// import 'package:fit_connect/screens/events/events.dart';
// import 'package:fit_connect/screens/start/start.dart';

final Map<String, WidgetBuilder> routes = <String, WidgetBuilder>{
  "/auth": (BuildContext context) => const AuthScreen(),
  "/home": (BuildContext context) => const HomeScreen(),
  "/bpm": (BuildContext context) => const BPMScreen(),
  "/stats": (BuildContext context) => const PersonalStatsScreen(),
  // TODO: "/events": (BuildContext context) => const EventsScreen(),
  // TODO: "/account": (BuildContext context) => const AccountScreen(),
  // TODO: "/account-edit": (BuildContext context) => AccountEditScreen(),
};
