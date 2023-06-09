import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/view_model/auth_view_model.dart';
import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:motion_toast/resources/arrays.dart';

class LoginForm extends StatefulWidget {
  final AuthViewModel viewModel;

  const LoginForm({super.key, required this.viewModel});

  @override
  LoginFormState createState() => LoginFormState();
}

class LoginFormState extends State<LoginForm> {
  late AuthViewModel viewModel;
  final _formKey = GlobalKey<FormState>();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _isLoading = false;

  void _setLoading(bool isLoading) {
    setState(() {
      _isLoading = isLoading;
    });
  }

  @override
  void initState() {
    super.initState();
    viewModel = widget.viewModel;
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const Text(
            '  Email',
            style: TextStyle(
                fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 5),
          TextFormField(
            controller: _email,
            decoration: InputDecoration(
              filled: true,
              fillColor: lightColorScheme.onPrimary,
              contentPadding:
                  const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
              isDense: true,
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
                borderSide:
                    BorderSide(width: 2.5, color: darkColorScheme.secondary),
              ),
            ),
          ),
          const SizedBox(height: 20),
          const Text(
            '  Password',
            style: TextStyle(
                fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 5),
          TextFormField(
            obscureText: true,
            controller: _password,
            decoration: InputDecoration(
              filled: true,
              fillColor: lightColorScheme.onPrimary,
              contentPadding:
                  const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
              isDense: true,
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(15),
                borderSide:
                    BorderSide(width: 2.5, color: darkColorScheme.secondary),
              ),
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
                      backgroundColor: lightColorScheme.scrim,
                      foregroundColor: lightColorScheme.onSecondary,
                      side: BorderSide(
                        width: 0.5,
                        color: lightColorScheme.onSecondary,
                      ),
                    ),
                    onPressed: _isLoading ? null : () => _loginUser(context),
                    child: _isLoading
                        ? SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              valueColor: AlwaysStoppedAnimation<Color>(
                                lightColorScheme.onSecondary,
                              ),
                            ),
                          )
                        : const Text('LOG IN'),
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
      _setLoading(true);
      await viewModel.login(_email.text, _password.text);

      if (context.mounted) {
        Navigator.pushNamedAndRemoveUntil(context, '/home', (_) => false);
      }
    } catch (e) {
      if (!viewModel.isOffline) {
        MotionToast.error(
          position: MotionToastPosition.top,
          animationType: AnimationType.fromTop,
          title: const Text(
            "Error",
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
          description: const Text('Login failed'),
        ).show(context);
      }
    } finally {
      _setLoading(false);
    }
  }
}
