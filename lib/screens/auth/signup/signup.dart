import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:fit_connect/services/firebase_errors.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:motion_toast/resources/arrays.dart';

class SignupForm extends StatefulWidget {
  const SignupForm({super.key});

  @override
  SignupFormState createState() => SignupFormState();
}

class SignupFormState extends State<SignupForm> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _firstName = TextEditingController();
  final _lastName = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextFormField(
            decoration: InputDecoration(
                filled: true,
                fillColor: LightColorScheme.onPrimary,
                hintText: 'First Name',
                hintStyle: const TextStyle(
                    fontSize: 15
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                )
            ),
            controller: _firstName,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'The first name is required';
              }
              return null;
            }
          ),
          const SizedBox(height: 15),
          TextFormField(
            decoration: InputDecoration(
                filled: true,
                fillColor: LightColorScheme.onPrimary,
                hintText: 'Last Name',
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                )
            ),
            controller: _lastName,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'The last name is required';
              }
              return null;
            }
          ),
          const SizedBox(height: 15),
          TextFormField(
            decoration: InputDecoration(
                filled: true,
                fillColor: LightColorScheme.onPrimary,
                hintText: 'Email',
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(25),
                )
            ),
            controller: _email,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'The email is required';
              }
              if (!value.contains('@')) {
                return 'The email is invalid';
              }
              return null;
            },
            onChanged: (_) {
              _formKey.currentState!.validate();
            }
          ),
          const SizedBox(height: 15),
          TextFormField(
          decoration: InputDecoration(
              filled: true,
              fillColor: LightColorScheme.onPrimary,
              hintText: 'Password',
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(25),
              )
          ),
            obscureText: true,
            controller: _password,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'The password is required';
              }
              if (value.length < 6) {
                return 'The password must have at least 6 characters';
              }
              return null;
            },
            onChanged: (_) {
              _formKey.currentState!.validate();
            },
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
                      if (_formKey.currentState!.validate()) {
                        _registerUser(context);
                      } else {
                        MotionToast.error(
                          position: MotionToastPosition.top,
                          animationType: AnimationType.fromTop,
                          title: const Text("Error",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              )),
                          description: const Text("There is some invalid data"),
                        ).show(context);
                      }
                    },
                    child: const Text('SIGN UP'),
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

  Future<void> _registerUser(BuildContext context) async {
    try {
      await _auth.createUserWithEmailAndPassword(
          email: _email.text, password: _password.text);
      // Store user in Firestore
      var uid = _auth.currentUser?.uid;
      CollectionReference users =
          FirebaseFirestore.instance.collection('users');
      users.doc(uid).set({
        'first-name': _firstName.text,
        'last-name': _lastName.text,
        'email': _email.text,
      });

      if (context.mounted) {
        Navigator.pushNamedAndRemoveUntil(context, '/home', (_) => false);
        MotionToast.success(
          position: MotionToastPosition.top,
          animationType: AnimationType.fromTop,
          title: const Text("Successful user registration",
              style: TextStyle(
                fontWeight: FontWeight.bold,
              )),
          description: const Text('¡You are ready for fit connecting!'),
        ).show(context);
      }
    } catch (e) {
      String errorMessage = '';
      if (e is FirebaseAuthException) {
        errorMessage = FirebaseExceptionHelper.getMessage(context, e);
      } else {
        errorMessage = 'An error has occurred. Please try again later';
      }
      MotionToast.error(
        position: MotionToastPosition.top,
        animationType: AnimationType.fromTop,
        title: const Text("Error",
            style: TextStyle(
              fontWeight: FontWeight.bold,
            )),
        description: Text(errorMessage),
      ).show(context);
    }
  }
}
