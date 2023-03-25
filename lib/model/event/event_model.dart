import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/model/event/event_repository.dart';
import 'package:fit_connect/model/user/user_repository.dart';
import "../shared/sports.dart";
import "package:fit_connect/model/user/user_model.dart";
import "package:fit_connect/model/event/event_dto.dart";

class EventModel {
  String? id;
  Sports sport;
  int playersNeeded;
  int playersBrought;
  int spotsAvailable;
  Timestamp startDate;
  Timestamp endDate;
  List<String> participantsIds;
  String eventOwnerId;
  String location;
  UserModel? eventOwner;
  List<UserModel?> participants = [];

  EventModel(
      {required this.sport,
      required this.playersNeeded,
      required this.playersBrought,
      required this.spotsAvailable,
      required this.startDate,
      required this.endDate,
      required this.participantsIds,
      required this.eventOwnerId,
      required this.location});

  set setId(String? id) => this.id = id;

  Future<UserModel?> getOwner() async {
    final UserRepository userRepository = UserRepository();
    eventOwner = await userRepository.getUser(eventOwnerId);
    return eventOwner;
  }

  Future<EventModel> addParticipant(participantId) async {
    final EventRepository eventRepository = EventRepository();
    participantsIds.add(participantId);
    spotsAvailable--;
    await eventRepository.updateEvent(EventDTO.fromModel(this));
    return this;
  }

  Future<EventModel> removeParticipant(participantId) async {
    final EventRepository eventRepository = EventRepository();
    participantsIds.remove(participantId);
    spotsAvailable++;
    await eventRepository.updateEvent(EventDTO.fromModel(this));
    return this;
  }

  Future<List<UserModel?>> getParticipants() async {
    final UserRepository userRepository = UserRepository();
    for (String participantsId in participantsIds) {
      UserModel? user = await userRepository.getUser(participantsId);
      var achievementAlreadyInsertedFound = participants
          .firstWhere((element) => element?.id == user?.id, orElse: () => null);
      if (user != null && achievementAlreadyInsertedFound == null) {
        participants.add(user);
      }
    }
    return participants;
  }
}
