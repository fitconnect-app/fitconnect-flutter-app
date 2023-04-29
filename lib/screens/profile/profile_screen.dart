import 'package:cached_network_image/cached_network_image.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/screens/profile/components/achievement.dart';
import 'package:fit_connect/services/firebase/singleton.dart';
import 'package:fit_connect/view_model/profile_view_model.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ProfileViewModel>(
      create: (context) => ProfileViewModel(),
      child: Consumer<ProfileViewModel>(
        builder: (context, viewModel, child) {
          if (viewModel.state == ProfileState.loading) {
            return const Scaffold(
                body: Center(
                  child: CircularProgressIndicator(),
                ),
                bottomNavigationBar: BottomNavBar(selectedTab: 2));
          } else {
            return Scaffold(
              appBar: AppBar(
                centerTitle: true,
                title: const Text(
                  'Profile',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                actions: [
                  IconButton(
                    icon: const Icon(Icons.help),
                    onPressed: () {
                      Navigator.pushNamed(context, '/help');
                    },
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
                      ),
                    ],
                    onSelected: (value) {
                      switch (value) {
                        case 0:
                          Navigator.pushNamed(context, '/settings');
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
              body: RefreshIndicator(
                onRefresh: viewModel.refreshProfile,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(2, 8, 2, 8),
                  child: _buildProfile(viewModel, context),
                ),
              ),
              bottomNavigationBar: const BottomNavBar(selectedTab: 2),
            );
          }
        },
      ),
    );
  }

  Widget _buildProfile(ProfileViewModel viewModel, context) {
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
      physics: const AlwaysScrollableScrollPhysics(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 16),
          CircleAvatar(
            radius: 50,
            backgroundImage: CachedNetworkImageProvider(
                viewModel.userData?.profilePicture ??
                    "https://via.placeholder.com/150"),
            onBackgroundImageError: (exception, stackTrace) {},
          ),
          const SizedBox(height: 16),
          const SizedBox(height: 16),
          Text(
            '${viewModel.userData?.firstName ?? "No data available"} ${viewModel.userData?.lastName ?? ""}',
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
            "${viewModel.userData?.fitconnectPoints != 0 ? (viewModel.userData?.fitconnectPoints ?? '0') : '0'}",
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
          _buildAchievements(viewModel),
        ],
      ),
    );
  }

  Widget _buildAchievements(viewModel) {
    if (viewModel.userData?.achievements.isEmpty ?? true) {
      return Text('No achievements yet!',
          style: TextStyle(
            fontSize: 24,
            fontFamily: GoogleFonts.rubik().fontFamily,
            fontWeight: FontWeight.w300,
          ));
    } else {
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ...List.generate(viewModel.userData?.achievements.length ?? 0,
              (index) {
            return AchievementWidget(
              name: viewModel.userData?.achievements[index].name ?? '',
              imagePath: viewModel.userData?.achievements[index].image ?? '',
            );
          })
        ],
      );
    }
  }
}
