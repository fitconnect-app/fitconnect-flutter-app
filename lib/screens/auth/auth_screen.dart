import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';

import 'components/auth_selector.dart';

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
            center: const Alignment(-0.4, -0.7), // Near the top right
            radius: 1.3,
            colors: [lightColorScheme.shadow, lightColorScheme.scrim],
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(50, 0, 50, 40),
              child: Column(
                children: [
                  Center(
                    child: Image.asset(
                        'assets/images/fitconnect-cropped-logo.png',
                        width: 200),
                  ),
                  const SizedBox(height: 10),
                  const Center(child: AuthSelector())
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
