import 'package:cloud_firestore/cloud_firestore.dart';

class AchievementModel {
  String? id;
  String name;
  String image;

  AchievementModel({
    required this.name,
    required this.image,
  });

  set setId(String? id) => this.id = id;

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'image': image,
    };
  }

  factory AchievementModel.fromMap(DocumentSnapshot document) {
    final data = document.data() as Map<String, dynamic>;
    return AchievementModel(
      name: data['name'],
      image: data['image'],
    )..id = document.id;
  }
}
