import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/emergency/emergency_model.dart';

class EmergencyDTO {
  String? id;
  final String userName;
  final String location;
  final String reason;
  final Timestamp timestamp;
  final String status;

  EmergencyDTO({
    this.id,
    required this.userName,
    required this.location,
    required this.reason,
    required this.timestamp,
    required this.status,
  });

  Map<String, dynamic> toMap() {
    return {
      'userName': userName,
      'location': location,
      'reason': reason,
      'timestamp': timestamp,
      'status': status,
    };
  }

  factory EmergencyDTO.fromMap(DocumentSnapshot document) {
    final data = document.data() as Map<String, dynamic>;
    return EmergencyDTO(
      id: document.id,
      userName: data['userName'],
      location: data['location'],
      reason: data['reason'],
      timestamp: data['timestamp'],
      status: data['status'],
    );
  }

  EmergencyModel toModel() {
    return EmergencyModel(
      userName: userName,
      location: location,
      reason: reason,
      timestamp: timestamp,
      status: status,
    )..id = id;
  }

  factory EmergencyDTO.fromModel(EmergencyModel model) {
    return EmergencyDTO(
      id: model.id,
      userName: model.userName,
      location: model.location,
      reason: model.reason,
      timestamp: model.timestamp,
      status: model.status,
    );
  }
}
