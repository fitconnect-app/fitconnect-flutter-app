import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:flutter/material.dart';
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
            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Text('Most searched/played sports per week:')),
                  const SizedBox(height: 10),
                  SizedBox(
                      height: 200,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: StatsBarChart(
                          data: viewModel.mostSearchedSports,
                        ),
                      )),
                  const Padding(
                    padding: EdgeInsets.all(10.0),
                    child: Text(
                        'Most frequent hours where you create or attend events:'),
                  ),
                  const SizedBox(height: 10),
                  SizedBox(
                      height: 200,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: StatsBarChart(
                          data: viewModel.mostFrequentHours,
                        ),
                      )),
                  const SizedBox(height: 10),
                  const Padding(
                    padding: EdgeInsets.all(10.0),
                    child: Text(
                        'Hours practiced a specific sport during the week:'),
                  ),
                  const SizedBox(height: 10),
                  SizedBox(
                      height: 200,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: StatsBarChart(
                          data: viewModel.hoursPracticed,
                        ),
                      )),
                ],
              ),
            );
          },
        ),
        bottomNavigationBar: const BottomNavBar(selectedTab: 0),
      ),
    );
  }
}
