import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/emergency/emergency_dto.dart';
import 'package:fit_connect/model/emergency/emergency_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class EmergencyRepository {
  CollectionReference emergencies = FirebaseInstance.firestore.collection('emergencies');

  Future<EmergencyModel> createEmergency(EmergencyDTO emergency) async {
    await emergencies.doc(emergency.id).set(emergency.toMap());
    return emergency.toModel();
  }

  Future<void> deleteEmergency(String id) async {
    await emergencies.doc(id).delete();
  }
}
