import 'package:flutter/widgets.dart';
import 'package:mas_colombia_app/screens/account/account.dart';
import 'package:mas_colombia_app/screens/events/events.dart';
import 'package:mas_colombia_app/screens/login/login.dart';
import 'package:mas_colombia_app/screens/signup/signup.dart';
import 'package:mas_colombia_app/screens/start/start.dart';

final Map<String, WidgetBuilder> routes = <String, WidgetBuilder>{
  "/start": (BuildContext context) => const StartScreen(),
  "/signup": (BuildContext context) => const SignUpScreen(),
  "/login": (BuildContext context) => const LoginScreen(),
  "/events": (BuildContext context) => const EventsScreen(),
  "/account": (BuildContext context) => const AccountScreen(),
  // TODO: "/account-edit": (BuildContext context) => AccountEditScreen(),
};
