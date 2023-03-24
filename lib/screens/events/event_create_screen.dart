import 'package:flutter/material.dart';
import './sport_form.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';

class SportFormScreen extends StatelessWidget {
  const SportFormScreen({super.key});

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
      bottomNavigationBar: const BottomNavBar(selectedTab: 1),
    );
  }
}
