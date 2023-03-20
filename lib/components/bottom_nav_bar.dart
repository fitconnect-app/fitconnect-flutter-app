import 'package:flutter/material.dart';

class BottomNavBar extends StatefulWidget {
  final int selectedTab;

  const BottomNavBar({Key? key, required this.selectedTab}) : super(key: key);

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  int _selectedTab = 0;

  @override
  void initState() {
    super.initState();
    _selectedTab = widget.selectedTab;
  }

  _changeTab(int index) {
    setState(() {
      _selectedTab = index;
    });

    switch (index) {
      case 0:
        Navigator.pushReplacementNamed(context, '/home');
        break;
      case 1:
        Navigator.pushReplacementNamed(context, '/events');
        break;
      case 2:
        Navigator.pushReplacementNamed(context, '/account');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.explore),
          label: 'Explore',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profile',
        ),
      ],
      currentIndex: _selectedTab,
      onTap: (index) => _changeTab(index),
    );
  }
}
