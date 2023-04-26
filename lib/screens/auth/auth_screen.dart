import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/view_model/auth_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'components/auth_selector.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<AuthViewModel>(
      create: (context) => AuthViewModel(),
      child: Consumer<AuthViewModel>(builder: (context, viewModel, child) {
        WidgetsBinding.instance.addPostFrameCallback(
          (_) {
            if (viewModel.isOffline) {
              getMessageSnackBar(
                  "Please check your internet connection and try again.",
                  ScaffoldMessenger.of(context));
            }
          },
        );
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
                      Center(child: AuthSelector(viewModel: viewModel))
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      }),
    );
  }
}
