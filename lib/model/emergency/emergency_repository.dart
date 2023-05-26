import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/emergency/emergency_dto.dart';
import 'package:fit_connect/model/emergency/emergency_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class EmergencyRepository {
  CollectionReference emergencies =
      FirebaseInstance.firestore.collection('emergencies');

  Future<EmergencyModel> createEmergency(EmergencyDTO emergency) async {
    await emergencies.doc(emergency.id).set(emergency.toMap());
    return emergency.toModel();
  }

  Future<EmergencyModel?> getEmergency(String id, bool getCache) async {
    final doc = await emergencies
        .doc(id)
        .get(getCache ? const GetOptions(source: Source.cache) : null);
    if (doc.exists) {
      return EmergencyDTO.fromMap(doc).toModel();
    }
    return null;
  }

  Future<dynamic> getEmergencyRef(String id) async {
    final doc = emergencies.doc(id);
    return doc;
  }

  Future<void> deleteEmergency(String id) async {
    await emergencies.doc(id).delete();
  }
}
