import 'package:flutter/material.dart';

class EventDetails extends StatelessWidget {
  final String subtitle;
  final String description;
  final String organizer;
  final String spotsAvailable;
  final List<String> participants;

  EventDetails({
    required this.subtitle,
    required this.description,
    required this.organizer,
    required this.spotsAvailable,
    required this.participants,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Event Details'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Center(
              child: Text(
                'Event Details',
                style: TextStyle(fontSize: 24.0, fontWeight: FontWeight.bold),
              ),
            ),
            SizedBox(height: 10.0),
            ClipRRect(
              borderRadius: BorderRadius.circular(8.0),
              child: Image.network(
                'https://picsum.photos/500',
                height: 130.0,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(height: 10.0),
            Text(
              subtitle,
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 5.0),
            Text('Time and Place:', style: TextStyle(fontSize: 16.0)),
            SizedBox(height: 5.0),
            Text(description, style: TextStyle(fontSize: 14.0)),
            SizedBox(height: 10.0),
            Text('Organizer:', style: TextStyle(fontSize: 16.0)),
            SizedBox(height: 5.0),
            Text(organizer, style: TextStyle(fontSize: 14.0)),
            SizedBox(height: 10.0),
            Text('Spots Available:', style: TextStyle(fontSize: 16.0)),
            SizedBox(height: 5.0),
            Text(spotsAvailable, style: TextStyle(fontSize: 14.0)),
            SizedBox(height: 10.0),
            Text('Participants:', style: TextStyle(fontSize: 16.0)),
            SizedBox(height: 5.0),
            for (var participant in participants)
              Padding(
                padding: EdgeInsets.symmetric(vertical: 2.0),
                child: Text(participant, style: TextStyle(fontSize: 14.0)),
              ),
          ],
        ),
      ),
    );
  }
}
