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
                      child: Text('Your Top Played Sports of the Week\n(Total Sport Count)', style: TextStyle(fontSize: 18))),
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
                        "When are You Most Active During the Week?\n(Most frequent hours)",
                        style: TextStyle(fontSize: 18)
                      ),
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
                        'How Much Have You Practiced Your Favorite Sports?\n(Hours Practiced)',
                        style: TextStyle(fontSize: 18)
                      ),
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
