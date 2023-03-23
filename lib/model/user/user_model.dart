import '../achievement/achievement_model.dart';
import '../achievement/achievement_repository.dart';

class UserModel {
  String? id;
  String firstName;
  String lastName;
  String email;
  String profilePicture;
  int fitconnectPoints;
  int eventStreak;
  List<String> achievementsIDs;
  List<AchievementModel> achievements = [];

  UserModel({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.profilePicture,
    required this.fitconnectPoints,
    required this.eventStreak,
    required this.achievementsIDs,
  });

  set setId(String? id) => this.id = id;

  Future<List<AchievementModel>> getAchievements() async {
    AchievementRepository achievementRepo = AchievementRepository();
    for (String achievementId in achievementsIDs) {
      AchievementModel? achievement =
          await achievementRepo.getAchievement(achievementId);
      if (achievement != null && !achievements.contains(achievement)) {
        achievements.add(achievement);
      }
    }
    return achievements;
  }
}
