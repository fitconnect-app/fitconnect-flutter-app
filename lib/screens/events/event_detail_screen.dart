import 'package:fit_connect/model/shared/sports.dart';
import 'package:flutter/material.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import "package:fit_connect/view_model/event_detail_view_model.dart";
import 'package:intl/intl.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:motion_toast/resources/arrays.dart';
import 'package:fit_connect/theme/style.dart';

class EventDetailScreen extends StatelessWidget {
  final String eventId;

  const EventDetailScreen({super.key, required this.eventId});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => EventDetailViewModel(eventId),
      child: Consumer<EventDetailViewModel>(
        builder: (context, viewModel, child) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Event Details'),
              centerTitle: true,
            ),
            body: Consumer<EventDetailViewModel>(
                builder: (context, viewModel, child) {
              if (viewModel.state == EventDetailState.loading) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              } else {
                return SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16.0, vertical: 16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8.0),
                        child: Image.network(
                          'https://picsum.photos/500',
                          height: 130.0,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(height: 10.0),
                      Text(
                        "Sport: ${viewModel.event!.sport.getString()}",
                        style: const TextStyle(
                            fontSize: 20.0, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 5.0),
                      Text(
                        'Time and Place:',
                        style: TextStyle(
                          fontSize: 17,
                          fontFamily: GoogleFonts.rubik().fontFamily,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 5.0),
                      Text(
                          '${_getFormattedDate(viewModel.event!.startDate.toDate())} // ${viewModel.event!.location}',
                          style: const TextStyle(fontSize: 14.0)),
                      const SizedBox(height: 10.0),
                      Text(
                        'Organizer:',
                        style: TextStyle(
                          fontSize: 17,
                          fontFamily: GoogleFonts.rubik().fontFamily,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 5.0),
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 2.0),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.grey,
                            width: 1.0,
                          ),
                          borderRadius: BorderRadius.circular(5.0),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text(
                                viewModel.event!.eventOwner?.getNameString() ??
                                    '',
                                style: const TextStyle(fontSize: 15.0),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 10.0),
                      Text(
                        'Spots Available: ${viewModel.event!.spotsAvailable}',
                        style: TextStyle(
                          fontSize: 17,
                          fontFamily: GoogleFonts.rubik().fontFamily,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        'Participants:',
                        style: TextStyle(
                          fontSize: 17,
                          fontFamily: GoogleFonts.rubik().fontFamily,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 10),
                      _getParticipantsWidget(viewModel.event!.participants)
                    ],
                  ),
                );
              }
            }),
            floatingActionButton: FloatingActionButton.extended(
              onPressed: () async {
                try {
                  await viewModel.joinEvent();
                  if (context.mounted) {
                    MotionToast.success(
                      position: MotionToastPosition.top,
                      animationType: AnimationType.fromTop,
                      title: const Text(
                        "Joined Event Successfully",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      description: const Text('You joined this event'),
                    ).show(context);
                  }
                } catch (e) {
                  MotionToast.error(
                    position: MotionToastPosition.top,
                    animationType: AnimationType.fromTop,
                    title: const Text(
                      "Error",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    description: Text(e.toString()),
                  ).show(context);
                }
              },
              label: const Text('Join',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  )),
              icon: const Icon(
                Icons.add,
                color: Colors.white,
              ),
              backgroundColor: lightColorScheme.primary,
            ),
            bottomNavigationBar: const BottomNavBar(selectedTab: 1),
          );
        },
      ),
    );
  }
}

Widget _getParticipantsWidget(List participantsList) {
  if (participantsList.isEmpty) {
    return const Text('No participants yet!');
  } else {
    return Column(
      children: List.generate(participantsList.length, (index) {
        return Container(
          padding: const EdgeInsets.symmetric(vertical: 2.0),
          decoration: BoxDecoration(
            border: Border.all(
              color: Colors.grey,
              width: 1.0,
            ),
            borderRadius: BorderRadius.circular(5.0),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  participantsList[index].getNameString(),
                  style: const TextStyle(fontSize: 15.0),
                ),
              ),
            ],
          ),
        );
      }),
    );
  }
}

String _getFormattedDate(DateTime date) {
  // Format the date in the desired format
  final formatter = DateFormat('EEEE MMMM d, h:mm a');
  return formatter.format(date);
}
