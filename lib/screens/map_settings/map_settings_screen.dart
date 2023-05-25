import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/view_model/map_settings_view_model.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:provider/provider.dart';

class MapSettings extends StatefulWidget {
  const MapSettings({super.key});

  @override
  MapSettingsState createState() => MapSettingsState();
}

class MapSettingsState extends State<MapSettings> {
  late MapSettingsViewModel viewModel;

  @override
  void initState() {
    super.initState();
    viewModel = MapSettingsViewModel();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<MapSettingsViewModel>(
      create: (context) => viewModel,
      child: Consumer<MapSettingsViewModel>(
        builder: (context, viewModel, child) {
          WidgetsBinding.instance.addPostFrameCallback(
            (_) {
              if (viewModel.isOffline) {
                getMessageSnackBar(
                  "Please check your internet connection, you can only access the map in cache mode to view it. You can choose the map location when you are online!",
                  ScaffoldMessenger.of(context),
                );
              }
            },
          );
          return Scaffold(
              appBar: AppBar(
                title: const Text('Map Settings'),
                centerTitle: true,
              ),
              body: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      ListTile(
                        title: const Text(
                          'Use Current Location',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                        subtitle: Text(viewModel.useCurrentLocation
                            ? 'Enabled'
                            : 'Disabled'),
                        onTap: () {
                          viewModel.useCurrentLocation =
                              !viewModel.useCurrentLocation;
                        },
                      ),
                      ListTile(
                        title: const Text(
                          'Map Type',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                        subtitle:
                            Text(viewModel.mapType.toString().split('.').last),
                        onTap: () {
                          _showMapTypeDialog(viewModel);
                        },
                      ),
                      const SizedBox(height: 15),
                      const Text(
                        'Event Map',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      const SizedBox(height: 5),
                      CachedNetworkImage(
                        imageUrl:
                            "https://gerenciacampus.uniandes.edu.co/var/diradm/storage/images/media/images/mapaweb/9064-1-esl-CO/MapaWeb.jpg",
                        placeholder: (context, url) =>
                            const CircularProgressIndicator(),
                        errorWidget: (context, url, error) =>
                            const Icon(Icons.error),
                      ),
                      const SizedBox(height: 10),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: lightColorScheme.primary,
                            foregroundColor: lightColorScheme.onSecondary),
                        onPressed: () async {
                          viewModel.savePreferences();
                          Navigator.of(context).pop({
                            'useCurrentLocation': viewModel.useCurrentLocation,
                            'mapType': viewModel.mapType,
                          });
                        },
                        child: const Text('Display Map'),
                      ),
                    ],
                  ),
                ),
              ),
              bottomNavigationBar: const BottomNavBar(selectedTab: 0));
        },
      ),
    );
  }

  void _showMapTypeDialog(viewModel) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Select Map Type'),
          content: DropdownButton<MapType>(
            value: viewModel.mapType,
            items: MapType.values
                .where((value) => value != MapType.none)
                .map((MapType value) {
              return DropdownMenuItem<MapType>(
                value: value,
                child: Text(value.toString().split('.').last),
              );
            }).toList(),
            onChanged: (newValue) {
              viewModel.mapType = newValue!;
              Navigator.of(context).pop(); // Close the dialog
            },
          ),
        );
      },
    );
  }
}
