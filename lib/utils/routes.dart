import 'package:fit_connect/screens/profile/profile.dart';
import 'package:fit_connect/screens/auth/auth_screen.dart';
import 'package:fit_connect/screens/bpm/bpm_screen.dart';
import 'package:fit_connect/screens/home/home_screen.dart';
import 'package:fit_connect/screens/stats/stats_screen.dart';
import 'package:flutter/widgets.dart';


final Map<String, WidgetBuilder> routes = <String, WidgetBuilder>{
  "/auth": (BuildContext context) => const AuthScreen(),
  "/profile": (BuildContext context) => const ProfileScreen(),
  "/home": (BuildContext context) => const HomeScreen(),
  "/bpm": (BuildContext context) => const BPMScreen(),
  "/stats": (BuildContext context) => const StatsScreen(),
  // TODO: "/events": (BuildContext context) => const EventsScreen(),
  // TODO: "/profile-edit": (BuildContext context) => ProfileEditScreen(),
};
