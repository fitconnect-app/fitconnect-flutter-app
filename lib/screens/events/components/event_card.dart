import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:fit_connect/screens/events/event_detail_screen.dart';

class EventCard extends StatelessWidget {
  final String id;
  final String sport;
  final String location;
  final Timestamp startDate;
  final Timestamp endDate;
  final int spotsAvailable;
  final String image;

  const EventCard({
    Key? key,
    required this.id,
    required this.sport,
    required this.location,
    required this.startDate,
    required this.endDate,
    required this.spotsAvailable,
    required this.image,
  }) : super(key: key);

  bool _isActiveEvent() {
    final currentDate = DateTime.now();
    final eventEndDate = endDate.toDate();
    // Check if the event has already ended
    if (eventEndDate.isBefore(currentDate)) {
      return false;
    }
    // Check if the spots are available
    if (spotsAvailable <= 0) {
      return false;
    }
    return true;
  }

  String _getFormattedDate(DateTime date) {
    // Format the date in the desired format
    final formatter = DateFormat('EEEE MMMM d, h:mm a');
    return formatter.format(date);
  }

  String _getFormattedHour(DateTime date) {
    // Format the date in the desired format
    final formatter = DateFormat('h:mm a');
    return formatter.format(date);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _isActiveEvent() ? _goToEventDetails(context) : null;
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: const BorderRadius.all(Radius.circular(10.0)),
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              darkColorScheme.primaryContainer,
              Colors.transparent,
            ],
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 5,
              blurRadius: 7,
              offset: const Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        child: Stack(
          children: [
            Container(
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
                  image: AssetImage(image),
                  fit: BoxFit.cover,
                  opacity: 0.5,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20.0, 16.0, 20.0, 8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    sport,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20.0,
                        color: Colors.white),
                  ),
                  const SizedBox(height: 6.0),
                  Text(
                    location,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 16.0, color: Colors.white),
                  ),
                  const SizedBox(height: 2.0),
                  Text(
                    '${_getFormattedDate(startDate.toDate())} - ${_getFormattedHour(endDate.toDate())}',
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 16.0, color: Colors.white),
                  ),
                  const SizedBox(height: 14.0),
                  Align(
                    alignment: Alignment.centerRight,
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius:
                            const BorderRadius.all(Radius.circular(8.0)),
                        color: _isActiveEvent()
                            ? darkColorScheme.primaryContainer
                            : lightColorScheme.error,
                      ),
                      padding: const EdgeInsets.symmetric(
                          vertical: 4.0, horizontal: 8.0),
                      child: _isActiveEvent()
                          ? Text(
                              '$spotsAvailable spots available',
                              style: const TextStyle(color: Colors.white),
                            )
                          : const Text(
                              'Closed event',
                              style: TextStyle(color: Colors.white),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _goToEventDetails(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => EventDetailScreen(eventId: id),
      ),
    );
  }
}
