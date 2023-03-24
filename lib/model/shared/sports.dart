import 'package:flutter/material.dart';

enum Sports {
  football,
  basketball,
  baseball,
  hockey,
  tennis,
  volleyball,
  swimming,
  track,
  boxing,
  martialArts,
  other
}

extension StringExtension on String {
  String capitalize() {
    return "${this[0].toUpperCase()}${substring(1).toLowerCase()}";
  }
}

extension ParseToString on Sports {
  String getString() {
    return toString().split('.').last.capitalize();
  }

  IconData getIcon() {
    switch (this) {
      case Sports.football:
        return Icons.sports_soccer;
      case Sports.basketball:
        return Icons.sports_basketball;
      case Sports.baseball:
        return Icons.sports_baseball;
      case Sports.hockey:
        return Icons.sports_hockey;
      case Sports.tennis:
        return Icons.sports_tennis;
      case Sports.volleyball:
        return Icons.sports_volleyball;
      case Sports.swimming:
        return Icons.pool;
      case Sports.track:
        return Icons.directions_run;
      case Sports.boxing:
        return Icons.fitness_center;
      case Sports.martialArts:
        return Icons.fitness_center;
      case Sports.other:
        return Icons.sports;
    }
  }
}
