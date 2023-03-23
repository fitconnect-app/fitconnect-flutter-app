import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/user/user_dto.dart';
import 'package:fit_connect/model/user/user_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class UserRepository {
  CollectionReference users = FirebaseInstance.firestore.collection('users');

  Future<UserModel?> getUser(String id) async {
    final doc = await users.doc(id).get();
    if (doc.exists) {
      return UserDTO.fromMap(doc).toModel();
    } else {
      return null;
    }
  }

  Stream<List<UserModel>> getUsers({int? limit}) {
    return users.limit(limit ?? 5).snapshots().map((snapshot) {
      return snapshot.docs
          .map((doc) => UserDTO.fromMap(doc).toModel())
          .toList();
    });
  }

  Future<UserModel> createUser(UserDTO user) async {
    final docRef = await users.add(user.toMap());
    user.setId = docRef.id;
    return user.toModel();
  }

  Future<void> updateUser(UserDTO user) async {
    await users.doc(user.id).update(user.toMap());
  }

  Future<void> deleteUser(String id) async {
    await users.doc(id).delete();
  }
}
