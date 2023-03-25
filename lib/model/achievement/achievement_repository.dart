import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/achievement/achievement_model.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class AchievementRepository {
  CollectionReference achievements =
      FirebaseInstance.firestore.collection('achievements');

  Future<AchievementModel?> getAchievement(String id) async {
    final doc = await achievements.doc(id).get();
    if (doc.exists) {
      return AchievementModel.fromMap(doc);
    } else {
      return null;
    }
  }

  Stream<List<AchievementModel>> getAchievements({int? limit}) {
    return achievements.limit(limit ?? 5).snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => AchievementModel.fromMap(doc)).toList();
    });
  }

  Future<AchievementModel> createAchievement(
      AchievementModel achievement) async {
    final docRef = await achievements.add(achievement.toMap());
    achievement.setId = docRef.id;
    return achievement;
  }

  Future<void> updateAchievement(AchievementModel achievement) async {
    await achievements.doc(achievement.id).update(achievement.toMap());
  }

  Future<void> deleteAchievement(String id) async {
    await achievements.doc(id).delete();
  }
}
