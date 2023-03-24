import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/user/user_model.dart';

class UserDTO {
  final String id;
  final String firstName;
  final String lastName;
  final String email;
  final String profilePicture;
  final int fitconnectPoints;
  final int eventStreak;
  final List<String> achievements;

  UserDTO({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.profilePicture,
    required this.fitconnectPoints,
    required this.eventStreak,
    required this.achievements,
  });

  Map<String, dynamic> toMap() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'profilePicture': profilePicture,
      'fitconnectPoints': fitconnectPoints,
      'eventStreak': eventStreak,
      'achievements': achievements,
    };
  }

  factory UserDTO.fromMap(DocumentSnapshot document) {
    final data = document.data() as Map<String, dynamic>;
    return UserDTO(
      id: document.id,
      firstName: data['firstName'],
      lastName: data['lastName'],
      email: data['email'],
      profilePicture: data['profilePicture'],
      fitconnectPoints: data['fitconnectPoints'],
      eventStreak: data['eventStreak'],
      achievements: List<String>.from(data['achievements']),
    );
  }

  UserModel toModel() {
    return UserModel(
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      profilePicture: profilePicture,
      fitconnectPoints: fitconnectPoints,
      eventStreak: eventStreak,
      achievementsIDs: achievements,
    );
  }

  factory UserDTO.fromModel(UserModel model) {
    return UserDTO(
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      profilePicture: model.profilePicture,
      fitconnectPoints: model.fitconnectPoints,
      eventStreak: model.eventStreak,
      achievements: model.achievementsIDs,
    );
  }
}
