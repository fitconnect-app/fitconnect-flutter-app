import 'package:flutter/material.dart';
import './sport_form.dart';

class SportFormScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sport Form'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: SportForm(),
      ),
    );
  }
}
