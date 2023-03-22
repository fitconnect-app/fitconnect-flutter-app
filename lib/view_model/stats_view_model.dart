// Import the models
import 'package:fit_connect/model/shared/sports.dart';
import 'package:flutter/material.dart';

class PersonalStatsViewModel extends ChangeNotifier {
  // Define the data sources
  final List<String> _sports = Sports.values.map((e) => e.getString()).toList();

  // Define the state variables
  bool _isLoading = true;
  List<SportCount> _mostPlayedSports = [];
  List<HourCount> _mostFrequentHours = [];
  List<SportHours> _practicedSportHours = [];

  // Define the getters for the state variables
  bool get isLoading => _isLoading;
  List<SportCount> get mostPlayedSports => _mostPlayedSports;
  List<HourCount> get mostFrequentHours => _mostFrequentHours;
  List<SportHours> get practicedSportHours => _practicedSportHours;

  // Define the constructor
  PersonalStatsViewModel() {
    // Simulate loading the data from a database or API
    Future.delayed(const Duration(seconds: 2), () {
      _generateData();
      _isLoading = false;
      notifyListeners();
    });
  }

  // Define the method that generates the data
  void _generateData() {
    // Generate random data for the most played sports
    _mostPlayedSports = List.generate(
      4,
      (index) => SportCount(
        name: _sports[index],
        count: 100 + index * 50,
        icon: Sports.values[index].getIcon(),
      ),
    );

    // Generate random data for the most frequent hours
    _mostFrequentHours = List.generate(
      4,
      (index) => HourCount(
        hour: index * 6,
        count: 50 + index * 25
      ),
    );

    // Generate random data for the practiced sport hours
    _practicedSportHours = List.generate(
      4,
      (index) => SportHours(
        name: _sports[index],
        hours: 5 + index * 2,
        icon: Sports.values[index].getIcon(),
      ),
    );
  }
}


class SportCount {
  final String? name;
  final int? count;
  final IconData? icon;

  SportCount({
    @required this.name,
    @required this.count,
    @required this.icon,
  });
}

class HourCount {
  final int? hour;
  final int? count;

  HourCount({
    @required this.hour,
    @required this.count,
  });
}

class SportHours {
  final String? name;
  final int? hours;
  final IconData? icon;

  SportHours({
    @required this.name,
    @required this.hours,
    @required this.icon,
  });
}