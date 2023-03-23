class UserModel {
  String? id;
  String firstName;
  String lastName;
  String email;
  String profilePicture;
  int fitconnectPoints;
  int eventStreak;
  List<String> achievements;

  UserModel({
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.profilePicture,
    required this.fitconnectPoints,
    required this.eventStreak,
    required this.achievements,
  });

  set setId(String? id) => this.id = id;
}
