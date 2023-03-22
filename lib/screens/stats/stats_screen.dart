import 'dart:math';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/view_model/stats_view_model.dart';

class PersonalStatsScreen extends StatelessWidget {
  const PersonalStatsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<PersonalStatsViewModel>(
      create: (_) => PersonalStatsViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Personal Stats'),
          centerTitle: true,
          leading: const BackButton(),
        ),
        body: Consumer<PersonalStatsViewModel>(
          builder: (context, model, child) {
            if (model.isLoading) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else {
              return SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 16),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        'Most Played Sports',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: model.mostPlayedSports.length,
                      itemBuilder: (context, index) {
                        final sport = model.mostPlayedSports[index];
                        final color = lightColorScheme.primary;
                        return _buildRow(
                            sport.name!, sport.count.toString(), color, sport.icon);
                      },
                    ),
                    const SizedBox(height: 16),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        'Most Frequent Hours',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 56,
                      child: ListView.builder(
                        shrinkWrap: true,
                        scrollDirection: Axis.horizontal,
                        itemCount: model.mostFrequentHours.length,
                        itemBuilder: (context, index) {
                          final hour = model.mostFrequentHours[index];
                          final color = darkColorScheme.tertiary;
                          return Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 8),
                            child: _buildRow('${hour.hour}:00', "", color, null),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        'Practiced Sport Hours',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: model.practicedSportHours.length,
                      itemBuilder: (context, index) {
                        final sportHours = model.practicedSportHours[index];
                        final color = darkColorScheme.secondary;
                        return _buildRow(sportHours.name!, sportHours.hours.toString(), color, sportHours.icon);
                      },
                    ),
                    const SizedBox(height: 16),
                  ],
                ),
              );
            }
          },
        ),
        bottomNavigationBar: const BottomNavBar(selectedTab: 0),
      ),
    );
  }
}


Widget _buildRow(String title, String? value, Color color, IconData? icon) {
  final widgetIcon = icon ?? Icons.sports; // Replace with actual sport icon
  return Card(
    shape: RoundedRectangleBorder(
      side: BorderSide(color: color, width: 2),
      borderRadius: BorderRadius.circular(20.0),
    ),
    color: Colors.white,
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(widgetIcon),
              const SizedBox(width: 8),
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
            ],
          ),
          Text(value ?? ""),
        ],
      ),
    ),
  );
}
