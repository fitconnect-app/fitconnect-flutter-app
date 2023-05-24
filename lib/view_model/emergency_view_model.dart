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

class EmergencyViewModel extends ChangeNotifier {
  final User? _user = FirebaseInstance.auth.currentUser;
  UserModel? _userData;
  final UserRepository _userRepository = UserRepository();
  final EmergencyRepository _emergencyRepository = EmergencyRepository();
  late GeoPoint _position;
  bool _isOffline = false;

  bool get isOffline => _isOffline;

  Future<void> sendHelpRequest(reason) async {
    if (!await checkConnectivity()) {
      // TODO: enqueue request
      _isOffline = true;
      notifyListeners();
    } else {
      _isOffline = false;
      Trace emergencyTrace = FirebasePerformance.instance.newTrace('emergency');
      emergencyTrace.start();
      _userData = await _userRepository.getUser(_user?.uid ?? '', _isOffline);
      await determinePosition().then((value) {
        _position = GeoPoint(value.latitude, value.longitude);
      }).catchError((error, stackTrace) {
        _position = const GeoPoint(0.0, 0.0);
      });

      // Store emergency in Firestore
      final emergency = EmergencyModel(
        userName: _userData?.getNameString() ?? 'Undefined User Name',
        location: _position,
        reason: reason,
        timestamp: Timestamp.now(),
        status: 'PENDING',
      );

      await _emergencyRepository
          .createEmergency(EmergencyDTO.fromModel(emergency));
      emergencyTrace.stop();
    }
  }
}
