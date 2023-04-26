import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/view_model/event_list_view_model.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../../components/message_snack_bar.dart';
import 'components/event_card.dart';

class EventsScreenArguments {
  final String? filter;

  EventsScreenArguments(this.filter);
}

class EventsListScreen extends StatefulWidget {
  const EventsListScreen({super.key});

  @override
  State<EventsListScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsListScreen> {
  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)!.settings.arguments as EventsScreenArguments;

    return ChangeNotifierProvider<EventsListViewModel>(
      create: (context) => EventsListViewModel(args.filter),
      child:
          Consumer<EventsListViewModel>(builder: (context, viewModel, child) {
        if (viewModel.state == EventState.loading) {
          return const Scaffold(
              body: Center(
                child: CircularProgressIndicator(),
              ),
              bottomNavigationBar: BottomNavBar(selectedTab: 1));
        } else {
          return Scaffold(
            appBar: AppBar(
              title: Text(
                'Find an event',
                style: TextStyle(
                  fontFamily: GoogleFonts.rubik().fontFamily,
                  fontWeight: FontWeight.w700,
                ),
              ),
              centerTitle: true,
              automaticallyImplyLeading: false,
              actions: [
                IconButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/createEvent');
                    },
                    icon: const Icon(Icons.add))
              ],
            ),
            body: RefreshIndicator(
              onRefresh: viewModel.refreshEvents,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(2, 8, 2, 8),
                child: _buildEventList(viewModel, args.filter),
              ),
            ),
            bottomNavigationBar: const BottomNavBar(selectedTab: 1),
          );
        }
      }),
    );
  }

  Widget _buildEventList(EventsListViewModel viewModel, String? sport) {
    WidgetsBinding.instance.addPostFrameCallback(
      (_) {
        if (viewModel.isOffline) {
          getMessageSnackBar(
              "There is no internet connection, showing the events when there were last updated!",
              ScaffoldMessenger.of(context));
        }
      },
    );

    if (viewModel.events?.isEmpty ?? true) {
      return Center(
        child: Text(
          sport != null ? 'No $sport events found' : 'No events found',
          style: const TextStyle(fontSize: 16),
        ),
      );
    } else {
      return ListView.builder(
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
              image:
                  event?.sport.getImage() ?? 'assets/images/events/other.jpeg',
            ),
          );
        },
      );
    }
  }
}
