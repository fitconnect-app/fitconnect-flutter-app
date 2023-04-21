import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsViewModel extends ChangeNotifier {
  late SharedPreferences _preferencesInstance;
  SettingsState _state = SettingsState.loading;

  SettingsState get state => _state;
  bool _cleanOnStartup = true;
  bool get cleanOnStartup => _cleanOnStartup;

  SettingsViewModel() {
    SharedPreferences.getInstance().then((preferences) {
      _preferencesInstance = preferences;
      _cleanOnStartup =
          _preferencesInstance.getBool('settingsCleanOnStartup') ?? true;
      _state = SettingsState.complete;
      notifyListeners();
    });
  }

  void toggle(bool value, String optionName) {
    switch (optionName) {
      case 'cleanOnStartup':
        _cleanOnStartup = value;
        _preferencesInstance.setBool('settingsCleanOnStartup', value);
        break;
      default:
        break;
    }
    notifyListeners();
  }
}

enum SettingsState { loading, complete }
