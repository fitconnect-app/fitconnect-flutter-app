import 'package:fit_connect/components/message_snack_bar.dart';
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
              title: Text(
                'Event Details',
                style: TextStyle(
                  fontFamily: GoogleFonts.rubik().fontFamily,
                  fontWeight: FontWeight.w700,
                ),
              ),
              centerTitle: true,
            ),
            body: Consumer<EventDetailViewModel>(
                builder: (context, viewModel, child) {
              if (viewModel.state == EventDetailState.loading) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              } else {
                return RefreshIndicator(
                    onRefresh: () => viewModel.getEvent(eventId),
                    child: _buildDetails(viewModel, context));
              }
            }),
            floatingActionButton: FloatingActionButton.extended(
              elevation:
                  viewModel.isOwner || viewModel.isJoiningOrLeaving ? 0 : 6,
              label: (!viewModel.isJoiningOrLeaving
                  ? Text(
                      viewModel.hasJoined
                          ? 'Leave event'
                          : (viewModel.isOwner
                              ? "Can't join your own event"
                              : 'Join'),
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: viewModel.isOwner
                            ? Colors.white.withOpacity(0.5)
                            : Colors.white,
                      ),
                    )
                  : Text(
                      !viewModel.hasJoined ? 'Joining...' : 'Leaving...',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white.withOpacity(0.8),
                      ),
                    )),
              icon: viewModel.isJoiningOrLeaving
                  ? CircularProgressIndicator(
                      color: Colors.white.withOpacity(0.8),
                      strokeWidth: 3,
                    )
                  : Icon(
                      (viewModel.hasJoined
                          ? Icons.exit_to_app
                          : (viewModel.isOwner ? Icons.do_disturb : Icons.add)),
                      color: viewModel.isOwner
                          ? Colors.white.withOpacity(0.5)
                          : Colors.white,
                    ),
              backgroundColor: viewModel.isOwner || viewModel.isJoiningOrLeaving
                  ? lightColorScheme.primary.withOpacity(0.5)
                  : (viewModel.hasJoined
                      ? lightColorScheme.error
                      : (lightColorScheme.primary)),
              onPressed: viewModel.isOwner || viewModel.isJoiningOrLeaving
                  ? null
                  : () async {
                      try {
                        if (viewModel.hasJoined) {
                          await _leaveConfirmation(context, viewModel)
                              ? await viewModel.leaveEvent()
                              : throw Exception("User cancelled leave action");
                        } else {
                          viewModel.isJoiningOrLeaving = true;
                          await viewModel.joinEvent();
                        }
                        if (context.mounted) {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) =>
                                  EventDetailScreen(eventId: eventId),
                            ),
                          );
                          MotionToast.success(
                            position: MotionToastPosition.top,
                            animationType: AnimationType.fromTop,
                            title: Text(
                              viewModel.hasJoined
                                  ? "Event abandoned succesfully"
                                  : "Joined Event Successfully",
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            description: Text(viewModel.hasJoined
                                ? 'You left this event'
                                : 'You joined this event'),
                          ).show(context);
                        }
                      } catch (e) {
                        if (e
                            .toString()
                            .contains("User cancelled leave action")) {
                          return;
                        }
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
            ),
            bottomNavigationBar: const BottomNavBar(selectedTab: 1),
          );
        },
      ),
    );
  }
}

Future<bool> _leaveConfirmation(context, viewModel) async {
  bool left = false;
  await showDialog<String>(
    context: context,
    builder: ((BuildContext context) => AlertDialog(
          title: const Text(
            'Leave Event',
          ),
          content: const Text('Are you sure you want to leave this event?'),
          actions: [
            TextButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Text("Cancel")),
            TextButton(
                onPressed: () async {
                  left = true;
                  viewModel.isJoiningOrLeaving = true;
                  if (context.mounted) Navigator.pop(context);
                },
                child: const Text("Leave"))
          ],
        )),
  );
  return left;
}

Widget _getParticipantsWidget(List participantsList) {
  if (participantsList.isEmpty) {
    return const Text('No participants yet!');
  } else {
    return Column(
      children: List.generate(
        participantsList.length,
        (index) {
          return Column(
            children: [
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
                        participantsList[index].getNameString(),
                        style:
                            TextStyle(fontSize: 15.0, color: Colors.grey[30]),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10.0),
            ],
          );
        },
      ),
    );
  }
}

Widget _buildDetails(EventDetailViewModel viewModel, context) {
  WidgetsBinding.instance.addPostFrameCallback(
    (_) {
      if (viewModel.isOffline) {
        getMessageSnackBar(
            "There is no internet connection, showing your profile when it was last updated!",
            ScaffoldMessenger.of(context));
      }
    },
  );
  return SingleChildScrollView(
    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(8.0),
          child: Container(
            height: 160.0,
            width: double.infinity,
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(10.0),
                topRight: Radius.circular(10.0),
                bottomLeft: Radius.circular(8.0),
                bottomRight: Radius.circular(8.0),
              ),
              image: DecorationImage(
                  image: AssetImage(
                    viewModel.event?.sport.getImage() ??
                        'assets/images/events/other.jpeg',
                  ),
                  fit: BoxFit.cover),
            ),
          ),
        ),
        const SizedBox(height: 10.0),
        Text(
          "Sport: ${viewModel.event!.sport.getString()}",
          style: const TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 15.0),
        Text(
          'Time and Place:',
          style: TextStyle(
            fontSize: 18,
            fontFamily: GoogleFonts.rubik().fontFamily,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 15.0),
        Text(
            '${_getFormattedDate(viewModel.event!.startDate.toDate())} // ${viewModel.event!.location}',
            style: TextStyle(
              fontSize: 15.0,
              fontFamily: GoogleFonts.rubik().fontFamily,
            )),
        const SizedBox(height: 15.0),
        Text(
          'Organizer:',
          style: TextStyle(
              fontSize: 17,
              fontFamily: GoogleFonts.rubik().fontFamily,
              fontWeight: FontWeight.w700,
              color: Colors.grey[30]),
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
                      'Cannot obtain organizer name, please connect to the internet',
                  style: const TextStyle(fontSize: 15.0),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 15.0),
        Text(
          'Spots Available: ${viewModel.event!.spotsAvailable}',
          style: TextStyle(
            fontSize: 17,
            fontFamily: GoogleFonts.rubik().fontFamily,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 15),
        Text(
          'Participants:',
          style: TextStyle(
            fontSize: 17,
            fontFamily: GoogleFonts.rubik().fontFamily,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 15),
        _getParticipantsWidget(viewModel.event!.participants)
      ],
    ),
  );
}

String _getFormattedDate(DateTime date) {
  // Format the date in the desired format
  final formatter = DateFormat('EEEE MMMM d, h:mm a');
  return formatter.format(date);
}
