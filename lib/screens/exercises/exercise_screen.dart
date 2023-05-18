import 'package:cached_network_image/cached_network_image.dart';
import 'package:expandable/expandable.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:fit_connect/view_model/exercise_list_view_model.dart';

class ExerciseListScreen extends StatelessWidget {
  const ExerciseListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ExerciseListViewModel>(
      create: (_) => ExerciseListViewModel(),
      child: Consumer<ExerciseListViewModel>(
        builder: (_, viewModel, __) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Exercise List'),
              centerTitle: true,
              actions: [
                IconButton(
                  icon: const Icon(Icons.filter_list),
                  onPressed: () async {
                    await viewModel.checkConnectionFromView();
                    if (viewModel.isOffline) {
                      return;
                    } else if (context.mounted) {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return StatefulBuilder(
                            builder:
                                (BuildContext context, StateSetter setState) {
                              return AlertDialog(
                                contentPadding:
                                    const EdgeInsets.only(left: 24, bottom: 24),
                                title: const Text('Filter exercises'),
                                content: SingleChildScrollView(
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      TextButton.icon(
                                        label: const Text("Clear Filters"),
                                        icon: const Icon(Icons.refresh),
                                        onPressed: () {
                                          setState(
                                            () {
                                              viewModel.typeFilter = 'Any';
                                              viewModel.muscleFilter = 'Any';
                                              viewModel.difficultyFilter =
                                                  'Any';
                                            },
                                          );
                                        },
                                      ),
                                      const Text('Exercise Type'),
                                      DropdownButton<String>(
                                        value: viewModel.typeFilter,
                                        onChanged: (newValue) {
                                          setState(() {
                                            viewModel.typeFilter =
                                                newValue ?? 'Any';
                                          });
                                        },
                                        items:
                                            viewModel.typeOptions.map((option) {
                                          return DropdownMenuItem<String>(
                                            value: option,
                                            child: Text(option),
                                          );
                                        }).toList(),
                                      ),
                                      const Text('Muscle'),
                                      DropdownButton<String>(
                                        value: viewModel.muscleFilter,
                                        onChanged: (newValue) {
                                          setState(() {
                                            viewModel.muscleFilter =
                                                newValue ?? 'Any';
                                          });
                                        },
                                        items: viewModel.muscleOptions
                                            .map((option) {
                                          return DropdownMenuItem<String>(
                                            value: option,
                                            child: Text(option),
                                          );
                                        }).toList(),
                                      ),
                                      const Text('Difficulty'),
                                      DropdownButton<String>(
                                        value: viewModel.difficultyFilter,
                                        onChanged: (newValue) {
                                          setState(() {
                                            viewModel.difficultyFilter =
                                                newValue ?? 'Any';
                                          });
                                        },
                                        items: viewModel.difficultyOptions
                                            .map((option) {
                                          return DropdownMenuItem<String>(
                                            value: option,
                                            child: Text(option),
                                          );
                                        }).toList(),
                                      ),
                                    ],
                                  ),
                                ),
                                actions: [
                                  TextButton(
                                    onPressed: () {
                                      viewModel.typeFilter = 'Any';
                                      viewModel.muscleFilter = 'Any';
                                      viewModel.difficultyFilter = 'Any';
                                      Navigator.of(context).pop();
                                    },
                                    child: const Text('Cancel'),
                                  ),
                                  ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                        backgroundColor:
                                            lightColorScheme.primary,
                                        foregroundColor:
                                            lightColorScheme.onSecondary),
                                    onPressed: () {
                                      viewModel.getExercises(saveFilters: true);
                                      if (context.mounted) {
                                        Navigator.of(context).pop();
                                      }
                                    },
                                    child: const Text('Filter'),
                                  ),
                                ],
                              );
                            },
                          );
                        },
                      );
                    }
                  },
                ),
              ],
            ),
            body: viewModel.state == ExerciseListState.loading
                ? const Center(
                    child: CircularProgressIndicator(),
                  )
                : RefreshIndicator(
                    onRefresh: () => viewModel.getExercises(),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(2, 8, 2, 8),
                      child: _buildExerciseList(viewModel, context),
                    ),
                  ),
            bottomNavigationBar: const BottomNavBar(selectedTab: 0),
          );
        },
      ),
    );
  }

  Widget _buildExerciseList(ExerciseListViewModel viewModel, context) {
    WidgetsBinding.instance.addPostFrameCallback(
      (_) {
        if (viewModel.isOffline) {
          getMessageSnackBar(
              'You have no internet connection. Showing the latest updated exercises!\nCannot filter exercises offline.',
              ScaffoldMessenger.of(context));
        }
      },
    );
    if (viewModel.exercises.isNotEmpty) {
      return ListView.builder(
        itemCount: viewModel.exercises.length,
        itemBuilder: (BuildContext context, int index) {
          return Padding(
            padding: const EdgeInsets.all(8.0),
            child: Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: ExpandableNotifier(
                child: Column(
                  children: [
                    Expandable(
                      collapsed: Stack(
                        children: [
                          _buildExerciseHeader(
                              viewModel.exercises[index]['name'],
                              viewModel.exercises[index]['imgUrl'],
                              false),
                        ],
                      ),
                      expanded: ExpandableButton(
                        child: Column(
                          children: [
                            _buildExerciseDetails(
                              viewModel.exercises[index]['name'],
                              viewModel.exercises[index]['type'],
                              viewModel.exercises[index]['muscle'],
                              viewModel.exercises[index]['difficulty'],
                              viewModel.exercises[index]['instructions'],
                              viewModel.exercises[index]['imgUrl'],
                            ),
                            const Align(
                              alignment: Alignment.centerRight,
                              child: Padding(
                                padding: EdgeInsets.only(right: 8.0),
                                child: Icon(
                                  Icons.expand_less,
                                  size: 30,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      );
    } else {
      return SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: SizedBox(
          height: MediaQuery.of(context).size.height / 1.3,
          width: MediaQuery.of(context).size.width,
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: Center(
              child: Text(
                viewModel.isOffline
                    ? 'You have no internet connection.\nPlease connect to the internet and pull down to refresh the exercise list.'
                    : 'No exercises found.\nPlease try with different filters.',
                textAlign: TextAlign.center,
                textDirection: TextDirection.ltr,
                style: const TextStyle(
                  fontSize: 15,
                ),
              ),
            ),
          ),
        ),
      );
    }
  }

  Widget _buildExerciseHeader(
      String name, String thumbnailUrl, bool isExpanded) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ExpandableButton(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              constraints: const BoxConstraints(
                maxHeight: 200,
              ),
              child: AspectRatio(
                aspectRatio: 2,
                child: CachedNetworkImage(
                  imageUrl: thumbnailUrl,
                  width: double.infinity,
                  height: 200,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    name,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
                Visibility(
                  visible: !isExpanded,
                  child: const Icon(
                    Icons.expand_more,
                    size: 30,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExerciseDetails(
    String name,
    String type,
    String muscle,
    String difficulty,
    String instructions,
    String imageUrl,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildExerciseHeader(name, imageUrl, true),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            'Type: $type\nMuscle: $muscle\nDifficulty: $difficulty',
          ),
        ),
        const SizedBox(height: 8),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            'Instructions:\n$instructions',
          ),
        ),
        const SizedBox(height: 8),
      ],
    );
  }
}
