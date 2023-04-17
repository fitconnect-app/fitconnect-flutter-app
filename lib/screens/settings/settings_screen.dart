import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/view_model/settings_view_model.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:settings_ui/settings_ui.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  SettingsScreenState createState() => SettingsScreenState();
}

class SettingsScreenState extends State<SettingsScreen> {
  late SettingsViewModel viewModel;

  @override
  void initState() {
    super.initState();
    viewModel = SettingsViewModel();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButton(color: Colors.black),
        title: const Text('Settings'),
        centerTitle: true,
      ),
      body: ChangeNotifierProvider<SettingsViewModel>(
        create: (_) => viewModel,
        child: Consumer<SettingsViewModel>(
          builder: (context, viewModel, child) {
            if (viewModel.state == SettingsState.loading) {
              return const Center(child: CircularProgressIndicator());
            } else {
              return SettingsList(
                lightTheme: SettingsThemeData(
                  settingsListBackground: Colors.white,
                  leadingIconsColor: lightColorScheme.primary,
                  titleTextColor: lightColorScheme.primary,
                ),
                sections: [
                  SettingsSection(
                    title: Text(
                      'Local Data',
                      style: TextStyle(
                        fontFamily: GoogleFonts.rubik().fontFamily,
                      ),
                    ),
                    tiles: <SettingsTile>[
                      SettingsTile.switchTile(
                        onToggle: (value) {
                          viewModel.toggle(value, "cleanOnStartup");
                        },
                        initialValue: viewModel.cleanOnStartup,
                        leading: const Icon(Icons.data_usage),
                        title: const Text('Delete old data on Startup'),
                        description: const Text(
                            'Deletes old local data when the app starts to keep your phone clean'),
                      ),
                    ],
                  ),
                ],
              );
            }
          },
        ),
      ),
      bottomNavigationBar: const BottomNavBar(selectedTab: 2),
    );
  }
}
