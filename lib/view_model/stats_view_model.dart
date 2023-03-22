import 'dart:math';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';

class DataStats {
  final int id;
  final String label;
  final double yValue;
  final Color color;

  DataStats(
      {required this.id,
      required this.label,
      required this.yValue,
      required this.color});
}

class MyPersonalStatisticsViewModel extends ChangeNotifier {
  List<DataStats> mostSearchedSports = [];
  List<DataStats> mostFrequentHours = [];
  List<DataStats> hoursPracticed = [];

  MyPersonalStatisticsViewModel() {
    generateRandomData();
  }

  void generateRandomData() {
    final random = Random();
    final colors = [
      lightColorScheme.primary,
      lightColorScheme.secondary,
      lightColorScheme.tertiary
    ];
    mostSearchedSports = List.generate(
        7,
        (index) => DataStats(
              id: index,
              label: 'Sport ${index + 1}',
              yValue: random.nextInt(10).toDouble(),
              color: colors[random.nextInt(colors.length)],
            ));
    mostFrequentHours = List.generate(
        12,
        (index) => DataStats(
              id: index,
              label: '${index + 1}h',
              yValue: random.nextInt(10).toDouble(),
              color: colors[random.nextInt(colors.length)],
            ));
    hoursPracticed = List.generate(
        7,
        (index) => DataStats(
              id: index,
              label: 'Sport ${index + 1}',
              yValue: random.nextInt(10).toDouble(),
              color: colors[random.nextInt(colors.length)],
            ));

    notifyListeners();
  }
}
