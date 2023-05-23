import '../achievement/achievement_model.dart';
import '../achievement/achievement_repository.dart';

class UserModel {
  String id;
  String firstName;
  String lastName;
  String email;
  String profilePicture;
  int fitconnectPoints;
  int eventStreak;
  List<String> achievementsIDs;
  List<AchievementModel?> achievements = [];

  UserModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.profilePicture,
    required this.fitconnectPoints,
    required this.eventStreak,
    required this.achievementsIDs,
  });

  Future<List<AchievementModel?>> getAchievements(bool getCache) async {
    AchievementRepository achievementRepo = AchievementRepository();
    for (final String achievementId in achievementsIDs) {
      final AchievementModel? achievement =
          await achievementRepo.getAchievement(achievementId, getCache);
      final achievementAlreadyInsertedFound = achievements.firstWhere(
          (element) => element?.id == achievement?.id,
          orElse: () => null);
      if (achievement != null && achievementAlreadyInsertedFound == null) {
        achievements.add(achievement);
      }
    }
    return achievements;
  }

  String getNameString() {
    return "$firstName $lastName";
  }
}
