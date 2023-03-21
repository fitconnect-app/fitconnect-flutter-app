import 'package:flutter/material.dart';

class HomeViewModel extends ChangeNotifier {
  List<SportCardInfo>? _sports;

  List<SportCardInfo>? get sports => _sports;

  HomeViewModel() {
    getSports();
    notifyListeners();
  }

  void getSports() {
    _sports = [
      SportCardInfo(
        title: 'Basketball',
        image: 'assets/images/basketball_card.webp',
        tag: 'basketball_events',
      ),
      SportCardInfo(
        title: 'Football',
        image: 'assets/images/football_card.jpg',
        tag: 'football_events',
      ),
      SportCardInfo(
        title: 'Volleyball',
        image: 'assets/images/volleyball_card.jpg',
        tag: 'volleyball_events',
      ),
      SportCardInfo(
        title: 'Tennis',
        image: 'assets/images/tennis_card.jpg',
        tag: 'tennis_events',
      ),
    ];
  }
}

class SportCardInfo {
  final String title;
  final String image;
  final String tag;

  SportCardInfo({required this.title, required this.image, required this.tag});
}
