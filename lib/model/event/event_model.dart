import 'package:cloud_firestore/cloud_firestore.dart';
import "../shared/sports.dart";

class EventModel {
  String? id;
  Sports sport;
  int playersNeeded;
  int playersBrought;
  int spotsAvailable;
  Timestamp startDate;
  Timestamp endDate;

  EventModel({
    required this.sport,
    required this.playersNeeded,
    required this.playersBrought,
    required this.spotsAvailable,
    required this.startDate,
    required this.endDate,
  });

  set setId(String? id) => this.id = id;
}