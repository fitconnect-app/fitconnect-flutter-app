import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/screens/events/event_list_screen.dart';
import 'package:fit_connect/screens/home/components/feature_button.dart';
import 'package:fit_connect/screens/home/components/sport_card.dart';
import 'package:fit_connect/view_model/home_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  HomeScreenState createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Home',
              style: TextStyle(
                fontFamily: GoogleFonts.rubik().fontFamily,
                fontWeight: FontWeight.w700,
              )),
          centerTitle: true,
          automaticallyImplyLeading: false,
        ),
        body: SingleChildScrollView(
            child: SizedBox(
          height: MediaQuery.of(context).orientation == Orientation.portrait
              ? MediaQuery.of(context).size.height / 1.28
              : MediaQuery.of(context).size.height / 0.5,
          child: Column(
            mainAxisSize: MainAxisSize.min,
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
              ChangeNotifierProvider<HomeViewModel>(
                create: (_) => HomeViewModel(),
                child: Consumer<HomeViewModel>(
                  builder: (_, model, __) {
                    return Expanded(
                      child: GridView.count(
                        crossAxisCount: 2,
                        padding: const EdgeInsets.all(16),
                        mainAxisSpacing: 16,
                        crossAxisSpacing: 16,
                        scrollDirection: Axis.horizontal,
                        childAspectRatio: 1 / 1.6,
                        children: getSportWidgets(model.sports),
                      ),
                    );
                  },
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
                    onPressed: () {
                      Navigator.pushNamed(
                        context,
                        '/events',
                        arguments: EventsScreenArguments(null),
                      );
                    },
                  ),
                  FeatureButton(
                    icon: Icons.favorite,
                    label: 'Heart Rate Monitor',
                    onPressed: () {
                      Navigator.pushNamed(context, '/bpm');
                    },
                  ),
                  FeatureButton(
                    icon: Icons.query_stats,
                    label: 'My Stats',
                    onPressed: () {
                      Navigator.pushNamed(context, "/stats");
                    },
                  ),
                ],
              ),
              const SizedBox(height: 25),
            ],
          ),
        )),
        bottomNavigationBar: const BottomNavBar(selectedTab: 0));
  }

  List<SportCard> getSportWidgets(sportData) {
    return sportData
        .map<SportCard>((x) => SportCard(
              title: x.title,
              imagePath: x.image,
              tag: x.tag,
              onTap: () {
                Navigator.pushNamed(
                  context,
                  '/events',
                  arguments: EventsScreenArguments(x.title),
                );
              },
            ))
        .toList();
  }
}
