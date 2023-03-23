class AchievementModel {
  String? id;
  String name;
  String image;

  AchievementModel({
    required this.name,
    required this.image,
  });

  set setId(String? id) => this.id = id;
}
