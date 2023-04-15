import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/user/user_dto.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class UserRepository {
  CollectionReference users = FirebaseInstance.firestore.collection('users');

  Future<UserModel?> getUser(String id, bool getCache) async {
    try {
      final doc = await users
          .doc(id)
          .get(getCache ? const GetOptions(source: Source.cache) : null);
      if (doc.exists) {
        return UserDTO.fromMap(doc).toModel();
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  Future<UserModel> createUser(UserDTO user) async {
    await users.doc(user.id).set(user.toMap());
    return user.toModel();
  }

  Future<void> updateUser(UserDTO user) async {
    await users.doc(user.id).update(user.toMap());
  }

  Future<void> deleteUser(String id) async {
    await users.doc(id).delete();
  }
}
