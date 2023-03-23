import 'package:cloud_firestore/cloud_firestore.dart';
import "../shared/sports.dart";
import 'event_model.dart';

class EventDTO {
  String? id;
  final Sports sport;
  final int playersNeeded;
  final int playersBrought;
  final int spotsAvailable;
  final Timestamp startDate;
  final Timestamp endDate;

  EventDTO({
    this.id,
    required this.sport,
    required this.playersNeeded,
    required this.playersBrought,
    required this.spotsAvailable,
    required this.startDate,
    required this.endDate,
  });

  set setId(String? id) => this.id = id;
  
  Map<String, dynamic> toMap() {
    return {
      'sport': sport.getString(),
      'playersNeeded': playersNeeded,
      'playersBrought': playersBrought,
      'spotsAvailable': spotsAvailable,
      'startDate': startDate,
      'endDate': endDate,
    };
  }

  factory EventDTO.fromMap(DocumentSnapshot document) {
    final data = document.data() as Map<String, dynamic>;
    return EventDTO(
      id: document.id,
      sport: Sports.values
          .firstWhere((e) => e.toString().split('.').last == data['sport']),
      playersNeeded: data['playersNeeded'],
      playersBrought: data['playersBrought'],
      spotsAvailable: data['spotsAvailable'],
      startDate: data['startDate'],
      endDate: data['endDate'],
    );
  }

  EventModel toModel() {
    return EventModel(
      sport: sport,
      playersNeeded: playersNeeded,
      playersBrought: playersBrought,
      spotsAvailable: spotsAvailable,
      startDate: startDate,
      endDate: endDate,
    )..id = id;
  }

  factory EventDTO.fromModel(EventModel model) {
    return EventDTO(
      id: model.id,
      sport: model.sport,
      playersNeeded: model.playersNeeded,
      playersBrought: model.playersBrought,
      spotsAvailable: model.spotsAvailable,
      startDate: model.startDate,
      endDate: model.endDate,
    );
  }
}
