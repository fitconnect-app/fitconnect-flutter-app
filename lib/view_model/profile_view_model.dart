import 'package:flutter/material.dart';

class ProfileViewModel extends ChangeNotifier {
  final _userRepository = UserRepository();
  final _userStatsRepository = UserPerformanceRepository();
  User _user;

  void getProfile(String userId) async {
    _user = await _userRepository.getUser(userId);
    var userStats = await _userStatsRepository.getUserPerformance(userId);
    _user.performance = userStats;
    notifyListeners();
  }
}

enum ProfileState {
  loading,
  completed,
  error,
}
