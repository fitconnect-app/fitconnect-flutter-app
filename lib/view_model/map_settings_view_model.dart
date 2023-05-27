import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapSettingsViewModel extends ChangeNotifier {
  bool _useCurrentLocation = true;
  MapType _mapType = MapType.normal;
  late SharedPreferences _preferences;
  bool _isOffline = false;

  MapType get mapType => _mapType;

  set mapType(MapType mapType) {
    _mapType = mapType;
    notifyListeners();
  }

  bool get useCurrentLocation => _useCurrentLocation;
  set useCurrentLocation(bool useCurrentLocation) {
    _useCurrentLocation = useCurrentLocation;
    notifyListeners();
  }

  bool get isOffline => _isOffline;

  MapSettingsViewModel() {
    SharedPreferences.getInstance().then(
      (preferences) {
        _preferences = preferences;
        getPreferences();
      },
    );
  }

  void getPreferences() async {
    if (!await checkConnectivity()) {
      _isOffline = true;
    } else {
      _isOffline = false;
    }
    useCurrentLocation = _preferences.getBool('useCurrentLocation') ?? true;
    mapType = MapType.values[_preferences.getInt('mapType') ?? 1];
    notifyListeners();
  }

  void savePreferences() async {
    _preferences.setBool('useCurrentLocation', useCurrentLocation);
    _preferences.setInt('mapType', mapType.index);
  }
}
