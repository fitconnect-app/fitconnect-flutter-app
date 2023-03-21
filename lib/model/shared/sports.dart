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
}