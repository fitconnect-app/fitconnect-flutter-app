import 'package:fit_connect/services/sheets/googlesheets.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';

class HelpViewModel extends ChangeNotifier {
  String? selectedSport;
  String? selectedFeature;
  String? feedback;
  bool _isOffline = false;

  bool get isOffline => _isOffline;

  HelpViewModel() {
    SheetsFlutter.init();
  }

  Future<void> sendFeedback() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
      notifyListeners();
      return;
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
  }
}