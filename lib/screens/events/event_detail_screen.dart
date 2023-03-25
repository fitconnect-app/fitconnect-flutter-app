import 'package:flutter/material.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:provider/provider.dart';
import "package:fit_connect/view_model/event_detail_view_model.dart";
import 'package:intl/intl.dart';

class EventDetailScreen extends StatelessWidget {
  final String eventId;

  const EventDetailScreen({super.key, required this.eventId});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => EventDetailViewModel(eventId),
      child: Scaffold(
        appBar: AppBar(
          title: Text('Event Details'),
        ),
        body: Consumer<EventDetailViewModel>(
            builder: (context, viewModel, child) {
          if (viewModel.state == EventDetailState.loading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            return SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
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
                    "Sport: ${viewModel.event!.sport}",
                    style: const TextStyle(
                        fontSize: 20.0, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 5.0),
                  const Text('Time and Place:',
                      style: TextStyle(fontSize: 16.0)),
                  const SizedBox(height: 5.0),
                  Text(
                      '${_getFormattedDate(viewModel.event!.startDate.toDate())} // ${viewModel.event!.location}',
                      style: const TextStyle(fontSize: 14.0)),
                  const SizedBox(height: 10.0),
                  const Text('Organizer:', style: TextStyle(fontSize: 16.0)),
                  const SizedBox(height: 5.0),
                  Text(viewModel.event!.eventOwner!.getNameString(),
                      style: const TextStyle(fontSize: 14.0)),
                  const SizedBox(height: 10.0),
                  Text('Spots Available: ${viewModel.event!.spotsAvailable}',
                      style: const TextStyle(fontSize: 16.0)),
                  const SizedBox(height: 5.0),
                  const Text('Participants:', style: TextStyle(fontSize: 16.0)),
                  const SizedBox(height: 5.0),
                  for (var participant in viewModel.event!.participants)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 2.0),
                      child: Text(participant!.getNameString(),
                          style: const TextStyle(fontSize: 14.0)),
                    ),
                ],
              ),
            );
          }
        }),
        bottomNavigationBar: const BottomNavBar(selectedTab: 1),
      ),
    );
  }
}

String _getFormattedDate(DateTime date) {
  // Format the date in the desired format
  final formatter = DateFormat('EEEE MMMM d, h:mm a');
  return formatter.format(date);
}
