import 'package:cloud_firestore/cloud_firestore.dart';

class ExerciseRoutine {
  String? id;
  String name;
  String description;
  String video;

  ExerciseRoutine({
    required this.name,
    required this.description,
    required this.video,
  });

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'description': description,
      'video': video,
    };
  }

  factory ExerciseRoutine.fromMap(DocumentSnapshot document) {
    final data = document.data() as Map<String, dynamic>;
    return ExerciseRoutine(
      name: data['name'],
      description: data['description'],
      video: data['video'],
    )..id = document.id;
  }
}
