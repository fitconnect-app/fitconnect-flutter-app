import 'dart:async';

import 'package:fit_connect/model/emergency/emergency_repository.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EmergencyService {
  late StreamController<String> _emergencyRequestStreamController;
  late Stream<String> _emergencyStream;
  late StreamSubscription firestoreSub;

  StreamController<String> get emergencyRequestStreamController =>
      _emergencyRequestStreamController;

  Stream<String> get emergencyStream => _emergencyStream;

  EmergencyService() {
    _emergencyRequestStreamController = StreamController.broadcast();
    _emergencyStream = _emergencyRequestStreamController.stream;
  }

  void init() async {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _startListeningEmergencyRequestChanges();
    });
  }

  void _startListeningEmergencyRequestChanges() async {
    final EmergencyRepository emergencyRepository = EmergencyRepository();

    SharedPreferences.getInstance().then((prefs) async {
      String lastRequestId = prefs.getString('lastEmergencyRequest') ?? '';
      final docRef = await emergencyRepository.getEmergencyRef(lastRequestId);
      firestoreSub = docRef.snapshots().listen(
        (emergency) {
          if (emergency.data() != null &&
              emergency.data()!['status'] == "APPROVED") {
            // Send data for changing emergency screen state
            _emergencyRequestStreamController.add("approved-request");
          }
        },
        onError: (error) => {},
      );
    });
  }

  void dispose() {
    _emergencyRequestStreamController.close();
    firestoreSub.cancel();
  }
}
