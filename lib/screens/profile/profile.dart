import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: const Text(
            'Profile',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () {},
            ),
            PopupMenuButton(
              itemBuilder: (BuildContext context) => [
                const PopupMenuItem(
                  value: 0,
                  child: Text('Settings'),
                ),
                const PopupMenuItem(
                  value: 1,
                  child: Text('Logout'),
                )
              ],
              onSelected: (value) {
                switch (value) {
                  case 0:
                    //TODO: Navigate to settings if settings will be a thing
                    break;
                  case 1:
                    FirebaseInstance.auth.signOut();
                    Navigator.pushReplacementNamed(context, '/auth');
                    break;
                }
              },
            ),
          ],
        ),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const CircleAvatar(
                radius: 50,
                backgroundImage:
                    NetworkImage('https://via.placeholder.com/150'),
              ),
              const SizedBox(height: 16),
              const SizedBox(height: 16),
              Text(
                'John Doe',
                style: TextStyle(
                  fontSize: 32,
                  fontFamily: GoogleFonts.rubik().fontFamily,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton(
                    icon: const Icon(Icons.favorite),
                    onPressed: () {},
                  ),
                  const SizedBox(width: 16),
                  IconButton(
                    icon: const Icon(Icons.share),
                    onPressed: () {},
                  ),
                ],
              ),
              const SizedBox(width: 6),
              Text(
                'FitConnect Points',
                style: TextStyle(
                    fontSize: 25,
                    fontFamily: GoogleFonts.rubik().fontFamily,
                    fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(
                '1500',
                style: TextStyle(
                  fontSize: 24,
                  fontFamily: GoogleFonts.rubik().fontFamily,
                  fontWeight: FontWeight.w300,
                ),
              ),
              const SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Text(
                  'Achievements',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 25,
                    fontFamily: GoogleFonts.rubik().fontFamily,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Column(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          color: Colors.green[200],
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.star, size: 40),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Achievement 1',
                        style: GoogleFonts.rubik(
                          fontWeight: FontWeight.w300,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          color: Colors.orange[200],
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.star, size: 40),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Achievement 2',
                        style: GoogleFonts.rubik(
                          fontWeight: FontWeight.w300,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                  Column(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          color: Colors.blue[200],
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.star, size: 40),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Achievement 3',
                        style: GoogleFonts.rubik(
                          fontWeight: FontWeight.w300,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
        bottomNavigationBar: const BottomNavBar(selectedTab: 2));
  }
}
