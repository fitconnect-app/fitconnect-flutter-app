import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
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
            if (viewModel.state == StatsState.loading) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else {
              return RefreshIndicator(
                onRefresh: viewModel.refreshStats,
                child: _buildStats(context, viewModel),
              );
            }
          },
        ),
        bottomNavigationBar: const BottomNavBar(selectedTab: 0),
      ),
    );
  }
}

Widget _buildStats(context, viewModel) {
  WidgetsBinding.instance.addPostFrameCallback(
    (_) {
      if (viewModel.isOffline) {
        getMessageSnackBar(
            "There is no internet connection, showing your latest updated stats!",
            context);
      }
    },
  );
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
            height: MediaQuery.of(context).size.height / 3.8,
            child: _buildStatsBarChart(
                viewModel.mostSearchedSports, viewModel.isOffline)),
        const Padding(
          padding: EdgeInsets.all(10.0),
          child: Text(
              "When are You Most Active During the Week?\n(Most frequent hours)",
              style: TextStyle(fontSize: 18)),
        ),
        SizedBox(
            height: MediaQuery.of(context).size.height / 3.8,
            child: _buildStatsBarChart(
                viewModel.mostFrequentHours, viewModel.isOffline)),
        const Padding(
          padding: EdgeInsets.all(10.0),
          child: Text(
              'How Much Have You Practiced Your Favorite Sports?\n(Hours Practiced)',
              style: TextStyle(fontSize: 18)),
        ),
        const SizedBox(height: 10),
        SizedBox(
            height: MediaQuery.of(context).size.height / 3.8,
            child: _buildStatsBarChart(
                viewModel.hoursPracticed, viewModel.isOffline)),
      ],
    ),
  );
}

Widget _buildStatsBarChart(List<DataStats> data, bool isOffline) {
  if (data.isEmpty) {
    return Center(
      child: Text(
          isOffline
              ? 'No data to display\nConnect to a network and try again'
              : 'No data to display.\nTry participating in some events!',
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 15,
          )),
    );
  }
  return Padding(
    padding: const EdgeInsets.only(left: 15, right: 15, top: 10),
    child: StatsBarChart(
      data: data,
    ),
  );
}
