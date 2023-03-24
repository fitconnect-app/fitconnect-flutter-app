import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/view_model/events_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'components/event_card.dart';

class EventsScreenArguments {
  final String? filter;

  EventsScreenArguments(this.filter);
}

class EventsScreen extends StatefulWidget {
  const EventsScreen({super.key});

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)!.settings.arguments as EventsScreenArguments;

    return ChangeNotifierProvider<EventsViewModel>(
      create: (context) => EventsViewModel(args.filter),
      child: Consumer<EventsViewModel>(builder: (context, viewModel, child) {
        if (viewModel.state == EventState.loading) {
          return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
              bottomNavigationBar: BottomNavBar(selectedTab: 1));
        } else {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Find an event'),
              centerTitle: true,
              automaticallyImplyLeading: false,
            ),
            body: Padding(
              padding: const EdgeInsets.fromLTRB(2, 8, 2, 8),
              child: ListView.builder(
                itemCount: viewModel.events?.length ?? 0,
                itemBuilder: (BuildContext context, int index) {
                  final event = viewModel.events?[index];
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: EventCard(
                      id: event?.id ?? '',
                      sport: event?.sport.getString() ?? '',
                      location: event?.location ?? '',
                      startDate: event?.startDate ?? Timestamp.now(),
                      endDate: event?.endDate ?? Timestamp.now(),
                      spotsAvailable: event?.spotsAvailable ?? 0,
                      image: event?.sport.getImage() ??
                          'assets/images/events/other.jpeg',
                    ),
                  );
                },
              ),
            ),
            bottomNavigationBar: const BottomNavBar(selectedTab: 1),
          );
        }
      }),
    );
  }
}
