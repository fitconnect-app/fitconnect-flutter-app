import 'package:fit_connect/services/sheets/googlesheets.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';

class HelpViewModel extends ChangeNotifier {
  String? selectedSport;
  String? selectedFeature;
  String? feedback;
  bool _isOffline = false;
  HelpState _state = HelpState.initial;

  bool get isOffline => _isOffline;
  HelpState get state => _state;

  HelpViewModel() {
    SheetsFlutter.init();
  }

  Future<void> sendFeedback() async {
    _state = HelpState.loading;
    if (!await checkConnectivity()) {
      _isOffline = true;
      _state = HelpState.error;
      notifyListeners();
      return;
    } else {
      _isOffline = false;
    }

    if (selectedSport == null || selectedFeature == null) {
      throw const FormatException('Please select a sport and a feature');
    }
    await SheetsFlutter.insert([
      {
        'Sport': selectedSport,
        'Feature': selectedFeature,
        'Feedback': feedback ?? '',
      }
    ]);
    _state = HelpState.success;
  }
}

enum HelpState { initial, loading, success, error }
