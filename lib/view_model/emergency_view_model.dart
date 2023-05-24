import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/emergency/emergency_dto.dart';
import 'package:fit_connect/model/emergency/emergency_model.dart';
import 'package:fit_connect/model/emergency/emergency_repository.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/services/geolocalizator/geolocalizator.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum EmergencyState {
  isInitialized,
  isWaiting,
  isAdminApproved,
}

class EmergencyViewModel extends ChangeNotifier {
  final User? _user = FirebaseInstance.auth.currentUser;
  UserModel? _userData;
  final UserRepository _userRepository = UserRepository();
  final EmergencyRepository _emergencyRepository = EmergencyRepository();
  late GeoPoint _position;
  bool _isOffline = false;
  bool _isRequestPending = false;
  String _reason = "General Accident";
  EmergencyState state = EmergencyState.isInitialized;

  bool get isOffline => _isOffline;

  String get reason => _reason;

    // Stream<String> get emergencyServiceStream => _emergencyService.eventStream;

  void setReason(newReason) => _reason = newReason;

  void changeEmergencyState(newState) {
    state = newState;
    notifyListeners();
  }

  Future<void> sendHelpRequest(reason) async {
    // Check if there is a pending request
    SharedPreferences.getInstance().then(
      (prefs) async {
        String lastRequestId = prefs.getString("lastEmergencyRequest") ?? '';
        if (lastRequestId != '') {
          var emergency = await _emergencyRepository.getEmergency(
            lastRequestId,
            _isOffline,
          );
          if (emergency == null) {
            return;
          }

          // Check if the emergency is older than 3 hours
          DateTime currentDateTime = DateTime.now();
          Duration timeDifference =
              currentDateTime.difference(emergency.timestamp.toDate());
          if (timeDifference.inHours >= 3) {
            // Delete the emergency
            _emergencyRepository.deleteEmergency(lastRequestId);
            prefs.setString('lastEmergencyRequest', '');
            return;
          }

          if (emergency.status == 'APPROVED') {
            _emergencyRepository.deleteEmergency(lastRequestId);
            prefs.setString('lastEmergencyRequest', '');
          } else if (emergency.status == 'PENDING') {
            _isRequestPending = true;
          }
        }
      },
    );

    if (!await checkConnectivity()) {
      _isOffline = true;
      // Do not enqueue new request if there is already one pending
      if (!_isRequestPending) {
        return;
      }
      notifyListeners();
    } else {
      _isOffline = false;
      // Do not create new request if there is already one pending
      if (!_isRequestPending) {
        return;
      }
      Trace emergencyTrace = FirebasePerformance.instance.newTrace('emergency');
      emergencyTrace.start();
      _userData = await _userRepository.getUser(_user?.uid ?? '', _isOffline);
      await determinePosition().then((value) {
        _position = GeoPoint(value.latitude, value.longitude);
      }).catchError((error, stackTrace) {
        _position = const GeoPoint(0.0, 0.0);
      });

      // Store emergency in Firestore
      var emergency = EmergencyModel(
        userName: _userData?.getNameString() ?? 'Undefined User Name',
        location: _position,
        reason: reason,
        timestamp: Timestamp.now(),
        status: 'PENDING',
      );
      emergency = await _emergencyRepository
          .createEmergency(EmergencyDTO.fromModel(emergency));

      // Store last emergency request on device
      final prefs = await SharedPreferences.getInstance();
      prefs.setString('lastEmergencyRequest', emergency.id ?? '');
      // emergencyService.
      emergencyTrace.stop();
    }
  }
}
