import 'package:flutter/material.dart';
import 'auth_selector.dart';
import 'package:fit_connect/theme/style.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      decoration: BoxDecoration(
          gradient: RadialGradient(
              center: const Alignment(-0.4, -0.7), // near the top right
              radius: 1.3,
              colors: [LightColorScheme.shadow, LightColorScheme.scrim],
              )),
      child: Center(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(50, 60, 50, 40),
            child: Column(
              children: [
                Center(
                  child: Image.asset(
                    'assets/images/fitconnect-logo.png',
                    height: 70,
                  ),
                ),
                const SizedBox(height: 20),
                const Center(child: AuthSelector()),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ),
      ),
    ));
  }
}
