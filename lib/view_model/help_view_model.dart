import 'package:flutter/material.dart';

class HelpViewModel extends ChangeNotifier {
  String? _selectedSport;
  String? _selectedFeature;
  String? _sportDetails;
  String? _featureDetails;
  String? _helpDetails;

  String? get selectedSport => _selectedSport;
  set selectedSport(String? value) {
    _selectedSport = value;
    notifyListeners();
  }

  String? get selectedFeature => _selectedFeature;
  set selectedFeature(String? value) {
    _selectedFeature = value;
    notifyListeners();
  }

  String? get sportDetails => _sportDetails;
  set sportDetails(String? value) {
    _sportDetails = value;
    notifyListeners();
  }

  String? get featureDetails => _featureDetails;
  set featureDetails(String? value) {
    _featureDetails = value;
    notifyListeners();
  }

  String? get helpDetails => _helpDetails;
  set helpDetails(String? value) {
    _helpDetails = value;
    notifyListeners();
  }
}
