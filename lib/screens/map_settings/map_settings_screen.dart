// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fit_connect/utils/connectivity.dart';

class MapSettings extends StatefulWidget {
  const MapSettings({super.key});

  @override
  MapSettingsState createState() => MapSettingsState();
}

class MapSettingsState extends State<MapSettings> {
  bool useCurrentLocation = true;
  MapType mapType = MapType.normal;
  late SharedPreferences _preferences;

  @override
  void initState() {
    super.initState();
    _loadPreferences();
  }

  Future<void> _loadPreferences() async {
    _preferences = await SharedPreferences.getInstance();
    setState(() {
      useCurrentLocation = _preferences.getBool('useCurrentLocation') ?? true;
      mapType = MapType.values[_preferences.getInt('mapType') ?? 0];
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!await checkConnectivity()) {
        getMessageSnackBar(
          "Please check your internet connection, you can only access the map in cache mode to view it.",
          ScaffoldMessenger.of(context),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Map Settings'),
      ),
      body: Padding(
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
              subtitle: Text(useCurrentLocation ? 'Enabled' : 'Disabled'),
              onTap: () {
                setState(() {
                  useCurrentLocation = !useCurrentLocation;
                });
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
              subtitle: Text(mapType.toString().split('.').last),
              onTap: () {
                _showMapTypeDialog();
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
              placeholder: (context, url) => const CircularProgressIndicator(),
              errorWidget: (context, url, error) => const Icon(Icons.error),
            ),
            ElevatedButton(
              onPressed: () async {
                await _savePreferences();
                Navigator.of(context).pop({
                  'useCurrentLocation': useCurrentLocation,
                  'mapType': mapType,
                });
              },
              child: const Text('Display Map'),
            ),
          ],
        ),
      ),
    );
  }

  void _showMapTypeDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Select Map Type'),
          content: DropdownButton<MapType>(
            value: mapType,
            items: MapType.values.map((MapType value) {
              return DropdownMenuItem<MapType>(
                value: value,
                child: Text(value.toString().split('.').last),
              );
            }).toList(),
            onChanged: (newValue) {
              setState(() {
                mapType = newValue!;
                Navigator.of(context).pop(); // Close the dialog
              });
            },
          ),
        );
      },
    );
  }

  Future<void> _savePreferences() async {
    await _preferences.setBool('useCurrentLocation', useCurrentLocation);
    await _preferences.setInt('mapType', mapType.index);
  }

  void getMessageSnackBar(String message, ScaffoldMessengerState messenger) {
    messenger.showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
  }
}
