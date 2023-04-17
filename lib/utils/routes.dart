import 'package:fit_connect/screens/auth/auth_screen.dart';
import 'package:fit_connect/screens/bpm/bpm_screen.dart';
import 'package:fit_connect/screens/events/event_list_screen.dart';
import 'package:fit_connect/screens/events/event_create_screen.dart';
import 'package:fit_connect/screens/home/home_screen.dart';
import 'package:fit_connect/screens/profile/profile_screen.dart';
import 'package:fit_connect/screens/settings/settings_screen.dart';
import 'package:fit_connect/screens/stats/stats_screen.dart';
import 'package:flutter/widgets.dart';

final Map<String, WidgetBuilder> routes = <String, WidgetBuilder>{
  "/auth": (BuildContext context) => const AuthScreen(),
  "/home": (BuildContext context) => const HomeScreen(),
  "/profile": (BuildContext context) => const ProfileScreen(),
  "/settings" : (BuildContext context) => const SettingsScreen(),
  // TODO: "/profile-edit": (BuildContext context) => ProfileEditScreen(),
  "/bpm": (BuildContext context) => const BPMScreen(),
  "/stats": (BuildContext context) => const StatsScreen(),
  "/events": (BuildContext context) => const EventsListScreen(),
  "/createEvent": (BuildContext context) => const SportFormScreen(),
};
