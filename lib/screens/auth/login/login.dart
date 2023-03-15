import 'package:firebase_auth/firebase_auth.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:motion_toast/resources/arrays.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  LoginFormState createState() => LoginFormState();
}

class LoginFormState extends State<LoginForm> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 40),
          TextFormField(
            controller: _email,
            decoration: InputDecoration(
              filled: true,
              fillColor: LightColorScheme.onPrimary,
              hintText: 'Email',
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(25),
              )
            ),
          ),
          const SizedBox(height: 20),
          TextFormField(
            obscureText: true,
            controller: _password,
            decoration: InputDecoration(
                filled: true,
                fillColor: LightColorScheme.onPrimary,
                hintText: 'Password',
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                )
            ),
          ),
          const SizedBox(height: 40),
          Center(
            child: Column(
              children: [
                SizedBox(
                  width: 250,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: LightColorScheme.scrim,
                      foregroundColor: LightColorScheme.onSecondary,
                      side: BorderSide(
                          width:0.5,
                          color: LightColorScheme.onSecondary
                      )
                    ),
                    onPressed: () {
                      _loginUser(context);
                    },
                    child: const Text('LOG IN'),
                  ),
                ),
                const SizedBox(height: 2)
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _loginUser(BuildContext context) async {
    try {
      await _auth.signInWithEmailAndPassword(
          email: _email.text, password: _password.text);

      if (context.mounted) {
        Navigator.pushNamedAndRemoveUntil(context, '/home', (_) => false);
      }
    } catch (e) {
      MotionToast.error(
        position: MotionToastPosition.top,
        animationType: AnimationType.fromTop,
        title: const Text("Error",
            style: TextStyle(
              fontWeight: FontWeight.bold,
            )),
        description: const Text('Login failed'),
      ).show(context);
    }
  }
}
