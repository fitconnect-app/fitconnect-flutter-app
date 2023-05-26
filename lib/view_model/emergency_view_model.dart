import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_performance/firebase_performance.dart';
import 'package:fit_connect/model/emergency/emergency_dto.dart';
import 'package:fit_connect/model/emergency/emergency_model.dart';
import 'package:fit_connect/model/emergency/emergency_repository.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import 'package:fit_connect/services/emergency/emergency_service.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/services/geolocalizator/geolocalizator.dart';
import 'package:fit_connect/utils/connectivity.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum EmergencyState {
  isInitialized,
  isLoading,
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
  bool _wasOfflineNotified = false;
  String _reason = 'General Accident';
  EmergencyState _state = EmergencyState.isInitialized;
  late EmergencyService _emergencyService;
  late SharedPreferences _preferencesInstance;

  bool get isOffline => _isOffline;

  bool get wasOfflineNotified => _wasOfflineNotified;

  String get reason => _reason;

  EmergencyState get state => _state;

  Stream<String> get emergencyServiceStream =>
      _emergencyService.emergencyStream;

  void setReason(newReason) => _reason = newReason;

  EmergencyViewModel() {
    changeEmergencyState(EmergencyState.isLoading);
    SharedPreferences.getInstance().then((prefs) {
      _preferencesInstance = prefs;
      _emergencyService = EmergencyService();
      checkPendingRequest(); // Don't allow to create requests if there is one pending
    });
  }

  void changeEmergencyState(newState) {
    _state = newState;
    notifyListeners();
  }

  void toggleWasOfflineNotified() {
    _wasOfflineNotified = !_wasOfflineNotified;
    notifyListeners();
  }

  void checkPendingRequest() async {
    _isOffline = !await checkConnectivity();
    final lastRequestId =
        _preferencesInstance.getString("lastEmergencyRequest") ?? '';
    // A enqueued request was found
    if (_preferencesInstance.getBool("isEmergencyRequestEnqueued") ?? false) {
      sendHelpRequest();
      return;
    }
    // No last emergency request was found
    if (lastRequestId.isEmpty) {
      if (state == EmergencyState.isLoading) {
        changeEmergencyState(EmergencyState.isInitialized);
        notifyListeners();
      }
      return;
    }
    // There was a previous emergency request
    final emergency = await _emergencyRepository.getEmergency(
      lastRequestId,
      _isOffline,
    );
    // Last emergency request was deleted
    if (emergency == null) {
      _preferencesInstance.setString('lastEmergencyRequest', '');
      if (state == EmergencyState.isLoading) {
        changeEmergencyState(EmergencyState.isInitialized);
        notifyListeners();
      }
      return;
    }
    // Check if the emergency is outdated (older than 3 hours)
    final currentDateTime = DateTime.now();
    final timeDifference =
        currentDateTime.difference(emergency.timestamp.toDate());
    final isRequestOutdated = timeDifference.inMinutes >= 30;
    // Show current last emergency approved request
    if (!isRequestOutdated && emergency.status == 'APPROVED') {
      if (state == EmergencyState.isLoading) {
        changeEmergencyState(EmergencyState.isAdminApproved);
        notifyListeners();
      }
      return;
    }
    // Delete outdated last emergency request
    if (isRequestOutdated) {
      _emergencyRepository.deleteEmergency(lastRequestId);
      _preferencesInstance.setString('lastEmergencyRequest', '');
      if (state == EmergencyState.isLoading) {
        changeEmergencyState(EmergencyState.isInitialized);
        notifyListeners();
      }
      return;
    }
    // There is a pending request
    if (emergency.status == 'PENDING') {
      changeEmergencyState(EmergencyState.isWaiting);
      notifyListeners();
      listenEmergencyStream();
    }
    // Prevent user stuck on loading
    if (state == EmergencyState.isLoading) {
      changeEmergencyState(EmergencyState.isInitialized);
      notifyListeners();
    }
  }

  Future<void> sendHelpRequest() async {
    // Send Firebase Custom Trace by Emergency Type
    var traceMsg = 'createEmergencyRequest';
    if (_reason == 'Medical Emergency') {
      traceMsg = 'createMedicalEmergencyRequest';
    }
    if (_reason == 'Facility Damage') {
      traceMsg = 'createFacilityDamageEmergencyRequest';
    }
    if (_reason == 'Natural Disaster') {
      traceMsg = 'createNaturalDisasterEmergencyRequest';
    }
    Trace emergencyTrace = FirebasePerformance.instance.newTrace(traceMsg);
    emergencyTrace.start();
    changeEmergencyState(EmergencyState.isLoading);

    // No internet connection detected on user create request
    if (!await checkConnectivity()) {
      _isOffline = true;
      // Enqueue new request
      changeEmergencyState(EmergencyState.isWaiting);
      _preferencesInstance.setBool('isEmergencyRequestEnqueued', true);
    }

    // Obtain additional user information for creating emergency request
    _userData = await _userRepository.getUser(_user?.uid ?? '', _isOffline);
    await determinePosition().then((value) {
      _position = GeoPoint(value.latitude, value.longitude);
    }).catchError((error, stackTrace) {
      _position = const GeoPoint(0.0, 0.0);
    });
    // Store emergency in Firestore
    var emergency = EmergencyModel(
      userName: _userData?.getNameString() ?? 'No Name',
      location: _position,
      reason: _reason,
      timestamp: Timestamp.now(),
      status: 'PENDING',
    );
    emergency.setId = _userData?.id;
    emergency = await _emergencyRepository
        .createEmergency(EmergencyDTO.fromModel(emergency));

    // Store last emergency request on device
    _preferencesInstance.setString(
      'lastEmergencyRequest',
      emergency.id.toString(),
    );
    // Listen for request changes with emergency service
    listenEmergencyStream();
    // Dequeue offline requests
    _preferencesInstance.setBool('isEmergencyRequestEnqueued', false);

    changeEmergencyState(EmergencyState.isWaiting);
    emergencyTrace.stop();
  }

  void listenEmergencyStream() {
    _emergencyService.init();
    _emergencyService.emergencyStream.listen(_onStreamValueAdded);
  }

  void _onStreamValueAdded(String value) {
    _state = EmergencyState.isAdminApproved;
    notifyListeners();
  }

  void closeEmergencyStream() {
    _emergencyService.dispose();
  }
}
