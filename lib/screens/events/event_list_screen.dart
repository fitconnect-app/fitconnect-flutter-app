import 'dart:async';
import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/model/shared/sports.dart';
import 'package:fit_connect/view_model/event_list_view_model.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

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
  String _currentTime = '';
  Timer? _timer;

  void _getCurrentTime() async {
    try {
      final response = await http.get(
        Uri.parse('http://worldtimeapi.org/api/ip'),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final datetime = data['datetime'];
        var hour = int.parse(datetime.substring(11, 13));
        final minute = datetime.substring(14, 16);
        String amPm = '';
        if (hour >= 12) {
          amPm = 'PM';
          hour -= 12;
        } else {
          amPm = 'AM';
        }
        if (hour == 0) {
          hour = 12;
        }
        setState(() {
          _currentTime = '$hour:$minute $amPm';
        });
      } else {
        throw Exception('Failed to load data of current time');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error: $e');
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _getCurrentTime();

    // Set up a timer to update the current time every minute
    _timer = Timer.periodic(const Duration(minutes: 1), (_) {
      _getCurrentTime();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

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
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (_currentTime.isNotEmpty)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  text: 'Local time: ',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                  ),
                  children: [
                    TextSpan(
                      text: _currentTime.substring(0, 5),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: Colors.blue,
                      ),
                    ),
                    TextSpan(
                      text: _currentTime.substring(5),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          Expanded(
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
        ],
      );
    }
  }
}
