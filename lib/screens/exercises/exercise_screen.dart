import 'package:cached_network_image/cached_network_image.dart';
import 'package:expandable/expandable.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
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
                  onPressed: () {
                    // Open filter dialog
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
                        _buildExerciseHeader(viewModel.exercises[index]['name'],
                            'https://picsum.photos/400/200', false),
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
                            'https://picsum.photos/600/300',
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
