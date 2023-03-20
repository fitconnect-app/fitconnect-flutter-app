import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/exercise/exercise_routine.dart';
import 'package:fit_connect/services/firebase/singleton.dart';

class ExerciseRepository {
  CollectionReference exercises =
      FirebaseInstance.firestore.collection('exercises');

  Future<ExerciseRoutine?> getRoutine(String id) async {
    final doc = await exercises.doc(id).get();
    if (doc.exists) {
      return ExerciseRoutine.fromMap(doc);
    } else {
      return null;
    }
  }

  Stream<List<ExerciseRoutine>> getRoutines({int? limit}) {
    return exercises.limit(limit ?? 5).snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => ExerciseRoutine.fromMap(doc)).toList();
    });
  }

  Future<ExerciseRoutine> createRoutine(ExerciseRoutine exercise) async {
    final docRef = await exercises.add(exercise.toMap());
    exercise.id = docRef.id;
    return exercise;
  }

  Future<void> updateRoutine(ExerciseRoutine exercise) async {
    await exercises.doc(exercise.id).update(exercise.toMap());
  }

  Future<void> deleteRoutine(String id) async {
    await exercises.doc(id).delete();
  }
}
