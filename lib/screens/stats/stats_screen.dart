import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'components/stats_bar_chart.dart';
import 'package:fit_connect/view_model/stats_view_model.dart';

class StatsScreen extends StatefulWidget {
  const StatsScreen({Key? key}) : super(key: key);

  @override
  State<StatsScreen> createState() => _StatsScreen();
}

class _StatsScreen extends State<StatsScreen> {
  late StatsViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = StatsViewModel();
  }

  @override
  void dispose() {
    _viewModel.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => _viewModel,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('My Personal Statistics'),
          centerTitle: true,
        ),
        body: Consumer<StatsViewModel>(
          builder: (context, viewModel, child) {
            return RefreshIndicator(
              onRefresh: viewModel.refreshStats,
              child: _buildStats(context, viewModel),
            );
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
            ScaffoldMessenger.of(context));
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
          child: _buildStatsBarChart(viewModel.mostSearchedSports,
              viewModel.isOffline, viewModel.topSportsState),
        ),
        const Padding(
          padding: EdgeInsets.all(10.0),
          child: Text(
              "When are You Most Active During the Week?\n(Most frequent hours)",
              style: TextStyle(fontSize: 18)),
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height / 3.8,
          child: _buildStatsBarChart(viewModel.mostFrequentHours,
              viewModel.isOffline, viewModel.mostFrequentHoursState),
        ),
        const Padding(
          padding: EdgeInsets.all(10.0),
          child: Text(
              'How Much Have You Practiced Your Favorite Sports?\n(Hours Practiced)',
              style: TextStyle(fontSize: 18)),
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: MediaQuery.of(context).size.height / 3.8,
          child: _buildStatsBarChart(viewModel.hoursPracticed,
              viewModel.isOffline, viewModel.hoursPracticedState),
        ),
        const Padding(
          padding: EdgeInsets.all(10.0),
          child: Text(
              'Your heart rate measurements during the last week\n(Average Heart Rate)',
              style: TextStyle(fontSize: 18)),
        ),
        const SizedBox(height: 10),
        SizedBox(
          height: MediaQuery.of(context).size.height / 3.8,
          child: _buildStatsBarChart(
              viewModel.bpmAverages, viewModel.isOffline, viewModel.bpmState,
              isBPM: true),
        ),
      ],
    ),
  );
}

Widget _buildStatsBarChart(
    List<DataStats> data, bool isOffline, StatsState chartState,
    {bool isBPM = false}) {
  if (chartState == StatsState.loading) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: const [
        Center(
          child: CircularProgressIndicator(),
        ),
        SizedBox(height: 10),
        Text('Loading data...'),
      ],
    );
  } else if (data.isEmpty) {
    return Center(
      child: Text(
          isOffline
              ? 'No data to display\nConnect to a network and try again'
              : (isBPM
                  ? 'No data to display\nTry measuring your heart rate!'
                  : 'No data to display.\nTry participating in some events!'),
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
