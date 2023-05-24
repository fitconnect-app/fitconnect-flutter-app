import 'package:cloud_firestore/cloud_firestore.dart';

class EmergencyModel {
  String? id;
  String userName;
  String location;
  String reason;
  Timestamp timestamp;
  String status;

  EmergencyModel({
    required this.userName,
    required this.location,
    required this.reason,
    required this.timestamp,
    required this.status,
  });

  set setId(String? id) => this.id = id;
}
