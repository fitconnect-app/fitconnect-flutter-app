import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'signup/signup.dart';
import 'login/login.dart';

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
                          : Colors
                              .transparent, // set the color of the bottom line
                      width: 2.0, // set the width of the bottom line
                    ),
                  ),
                ),
                padding: const EdgeInsets.symmetric(
                    vertical: 10.0), // add padding to the button
                child: Text(
                  'LOG IN',
                  style: TextStyle(
                      fontSize: 16.0, // set the font size of the button text
                      fontWeight: FontWeight.bold,
                      color: _isLoginForm
                          ? LightColorScheme.onPrimary
                          : LightColorScheme.onPrimary.withOpacity(
                              0.75) // set the font weight of the button text
                      ),
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
                          : LightColorScheme
                              .tertiary, // set the color of the bottom line
                      width: 2.0, // set the width of the bottom line
                    ),
                  ),
                ),
                padding: const EdgeInsets.symmetric(
                    vertical: 10.0), // add padding to the button
                child: Text(
                  'SIGN UP',
                  style: TextStyle(
                      fontSize: 16.0, // set the font size of the button text
                      fontWeight: FontWeight.bold,
                      color: _isLoginForm
                          ? LightColorScheme.onPrimary.withOpacity(0.75)
                          : LightColorScheme
                              .onPrimary // set the font weight of the button text
                      ),
                ),
              ),
            )
          ],
        ),
        const SizedBox(height: 16.0),
        _isLoginForm ? _buildLoginWidget() : _buildSignupWidget(),
      ],
    );
  }
}
