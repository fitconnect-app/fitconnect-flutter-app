import 'package:flutter/material.dart';

class Sport {
  final IconData icon;
  final String title;
  final Color color;

  const Sport({
    required this.icon,
    required this.title,
    required this.color,
  });
}

List<Sport> getSports() {
  return [
    const Sport(
      icon: Icons.sports_soccer,
      title: 'Football',
      color: Colors.blue,
    ),
    const Sport(
      icon: Icons.sports_basketball,
      title: 'Basketball',
      color: Colors.orange,
    ),
    const Sport(
      icon: Icons.sports_tennis,
      title: 'Tennis',
      color: Colors.green,
    ),
    const Sport(
      icon: Icons.sports_volleyball,
      title: 'Volleyball',
      color: Colors.red,
    ),
  ];
}
