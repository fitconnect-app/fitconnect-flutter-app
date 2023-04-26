import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/view_model/auth_view_model.dart';
import 'package:flutter/material.dart';

import 'login.dart';
import 'signup.dart';

class AuthSelector extends StatefulWidget {
  final AuthViewModel viewModel;

  const AuthSelector({super.key, required this.viewModel});

  @override
  AuthSelectorState createState() => AuthSelectorState();
}

class AuthSelectorState extends State<AuthSelector> {
  bool _isLoginForm = true;

  void _switchFormState(String buttonText) {
    if (_isLoginForm && buttonText == 'Sign up') {
      setState(() {
        _isLoginForm = !_isLoginForm;
      });
    } else if (!_isLoginForm && buttonText == 'Log in') {
      setState(() {
        _isLoginForm = !_isLoginForm;
      });
    }
  }

  Widget _buildLoginWidget() {
    return LoginForm(viewModel: widget.viewModel);
  }

  Widget _buildSignupWidget() {
    return SignupForm(viewModel: widget.viewModel);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            InkWell(
              onTap: () => _switchFormState('Log in'),
              child: Container(
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(
                      color: _isLoginForm
                          ? lightColorScheme.tertiary
                          : Colors.transparent,
                      width: 2.0,
                    ),
                  ),
                ),
                padding: const EdgeInsets.symmetric(vertical: 10.0),
                child: Text(
                  'LOG IN',
                  style: TextStyle(
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                      color: _isLoginForm
                          ? lightColorScheme.onPrimary
                          : lightColorScheme.onPrimary.withOpacity(0.75)),
                ),
              ),
            ),
            InkWell(
              onTap: () => _switchFormState('Sign up'),
              child: Container(
                decoration: BoxDecoration(
                  border: Border(
                    bottom: BorderSide(
                      color: _isLoginForm
                          ? Colors.transparent
                          : lightColorScheme.tertiary,
                      width: 2.0,
                    ),
                  ),
                ),
                padding: const EdgeInsets.symmetric(vertical: 10.0),
                child: Text(
                  'SIGN UP',
                  style: TextStyle(
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                      color: _isLoginForm
                          ? lightColorScheme.onPrimary.withOpacity(0.75)
                          : lightColorScheme.onPrimary),
                ),
              ),
            )
          ],
        ),
        const SizedBox(height: 16.0),
        Container(
          alignment: Alignment.center,
          width: 300,
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 750),
            child: _isLoginForm ? _buildLoginWidget() : _buildSignupWidget(),
          ),
        )
      ],
    );
  }
}
