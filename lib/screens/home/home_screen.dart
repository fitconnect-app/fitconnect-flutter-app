import 'package:flutter/material.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:fit_connect/screens/home/components/sport_card.dart';
import 'package:fit_connect/screens/home/components/feature_button.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        centerTitle: true,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              'Find a sport/event',
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  fontFamily: GoogleFonts.rubik().fontFamily),
            ),
          ),
          Expanded(
            child: GridView.count(
              crossAxisCount: 2,
              padding: const EdgeInsets.all(16),
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              scrollDirection: Axis.horizontal,
              childAspectRatio: 1 / 1.6,
              children: getSports(),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              'Recommended features for you',
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  fontFamily: GoogleFonts.rubik().fontFamily),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              FeatureButton(
                icon: Icons.event,
                label: 'Events',
                onPressed: () {},
              ),
              FeatureButton(
                icon: Icons.favorite,
                label: 'Heart Rate Monitor',
                onPressed: () {
                  Navigator.pushNamed(context, '/bpm');
                },
              ),
              FeatureButton(
                icon: Icons.settings,
                label: 'Settings',
                onPressed: () {},
              ),
            ],
          ),
          const SizedBox(height: 25),
          const BottomNavBar(selectedTab: 0),
        ],
      ),
    );
  }

  List<SportCard> getSports() {
    return [
      SportCard(
        title: 'Basketball',
        imagePath: 'assets/images/basketball_card.webp',
        tag: 'basketball_events',
        onTap: () {},
      ),
      SportCard(
        title: 'Football',
        imagePath: 'assets/images/football_card.jpg',
        tag: 'football_events',
        onTap: () {},
      ),
      SportCard(
        title: 'Volleyball',
        imagePath: 'assets/images/volleyball_card.jpg',
        tag: 'volleyball_events',
        onTap: () {},
      ),
      SportCard(
        title: 'Tennis',
        imagePath: 'assets/images/tennis_card.jpg',
        tag: 'tennis_events',
        onTap: () {},
      ),
    ];
  }
}