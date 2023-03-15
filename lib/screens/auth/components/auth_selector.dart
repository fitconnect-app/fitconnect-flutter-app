import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'signup.dart';
import 'login.dart';

class AuthSelector extends StatefulWidget {
  const AuthSelector({super.key});

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
    return const LoginForm();
  }

  Widget _buildSignupWidget() {
    return const SignupForm();
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
                          ? LightColorScheme.tertiary
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
                          ? LightColorScheme.onPrimary
                          : LightColorScheme.onPrimary.withOpacity(0.75)),
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
                          : LightColorScheme.tertiary,
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
                          ? LightColorScheme.onPrimary.withOpacity(0.75)
                          : LightColorScheme.onPrimary),
                ),
              ),
            )
          ],
        ),
        const SizedBox(height: 16.0),
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 750),
          child: _isLoginForm ? _buildLoginWidget() : _buildSignupWidget(),
        ),
      ],
    );
  }
}
