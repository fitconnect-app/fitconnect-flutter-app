import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsViewModel extends ChangeNotifier {
  late SharedPreferences _preferencesInstance;
  SettingsState _state = SettingsState.loading;

  SettingsState get state => _state;
  bool _cleanOnStartup = true;
  bool _eventAutoreload = true;

  bool get cleanOnStartup => _cleanOnStartup;

  bool get eventAutoreload => _eventAutoreload;

  SettingsViewModel() {
    SharedPreferences.getInstance().then((preferences) {
      _preferencesInstance = preferences;
      _cleanOnStartup =
          _preferencesInstance.getBool('settingsCleanOnStartup') ?? true;
      _eventAutoreload =
          _preferencesInstance.getBool('settingsEventAutoreload') ?? true;
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
      case 'eventAutoreload':
        _eventAutoreload = value;
        _preferencesInstance.setBool('settingsEventAutoreload', value);
        break;
      default:
        break;
    }
    notifyListeners();
  }
}

enum SettingsState { loading, complete }
