import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'components/stats_bar_chart.dart';
import 'package:fit_connect/view_model/stats_view_model.dart';

class StatsScreen extends StatelessWidget {
  const StatsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyPersonalStatisticsViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('My Personal Statistics'),
          centerTitle: true,
        ),
        body: Consumer<MyPersonalStatisticsViewModel>(
          builder: (context, viewModel, child) {
            if (viewModel.state == StatsState.loading) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else {
              return SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Padding(
                        padding: EdgeInsets.all(10.0),
                        child: Text(
                            'Your Top Played Sports of the Week\n(Total Sport Count)',
                            style: TextStyle(fontSize: 18))),
                    SizedBox(
                        height: 200,
                        child:
                            _buildStatsBarChart(viewModel.mostSearchedSports)),
                    const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Text(
                          "When are You Most Active During the Week?\n(Most frequent hours)",
                          style: TextStyle(fontSize: 18)),
                    ),
                    SizedBox(
                        height: 200,
                        child:
                            _buildStatsBarChart(viewModel.mostFrequentHours)),
                    const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Text(
                          'How Much Have You Practiced Your Favorite Sports?\n(Hours Practiced)',
                          style: TextStyle(fontSize: 18)),
                    ),
                    const SizedBox(height: 10),
                    SizedBox(
                        height: 200,
                        child: _buildStatsBarChart(viewModel.hoursPracticed)),
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

Widget _buildStatsBarChart(List<DataStats> data) {
  if (data.isEmpty) {
    return const Center(
      child: Text('No data to display.\nTry participating in some events!',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 15,
          )),
    );
  }
  return Padding(
    padding: const EdgeInsets.all(15),
    child: StatsBarChart(
      data: data,
    ),
  );
}
