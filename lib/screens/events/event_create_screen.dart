import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/screens/events/event_list_screen.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:duration_picker/duration_picker.dart';
import 'package:fit_connect/components/bottom_nav_bar.dart';
import "package:fit_connect/model/shared/sports.dart";
import "package:fit_connect/view_model/event_create_view_model.dart";
import 'package:motion_toast/motion_toast.dart';
import 'package:motion_toast/resources/arrays.dart';
import 'package:provider/provider.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:google_maps_place_picker_mb/google_maps_place_picker.dart';
import '../map_settings/map_settings_screen.dart';

class SportFormScreen extends StatefulWidget {
  const SportFormScreen({super.key});

  @override
  SportFormState createState() => SportFormState();
}

class SportFormState extends State<SportFormScreen> {
  final List<String> _sports = Sports.values.map((e) => e.getString()).toList();

  final List<int> _playerCounts = List.generate(11, (index) => index + 1);

  String? _selectedSport;
  int? _selectedPlayerCount;
  int? _broughtPlayerCount;
  DateTime? _selectedDateTime;
  Duration? _duration;

  final TextEditingController _dateController = TextEditingController();
  final TextEditingController _durationController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();

  late EventCreateViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = EventCreateViewModel();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => _viewModel,
      child: Consumer<EventCreateViewModel>(
        builder: (context, viewModel, child) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Create an Event'),
              centerTitle: true,
              actions: [
                PopupMenuButton(
                  itemBuilder: (BuildContext context) => [
                    const PopupMenuItem(
                      value: 0,
                      child: Text('Save event as template'),
                    ),
                    const PopupMenuItem(
                      value: 1,
                      child: Text('Load event template'),
                    )
                  ],
                  onSelected: (value) async {
                    switch (value) {
                      case 0:
                        // Stores form data in Shared Preferences
                        await viewModel.saveFormData(
                            _selectedSport,
                            _selectedPlayerCount,
                            _broughtPlayerCount,
                            _selectedDateTime,
                            _duration,
                            _locationController.text);
                        if (context.mounted) {
                          getMessageSnackBar(
                              "Event Template Saved Successfully!",
                              ScaffoldMessenger.of(context));
                        }
                        break;
                      case 1:
                        var data = await _viewModel.loadFormData();
                        setState(
                          () {
                            _selectedSport = data['selectedSport'].isEmpty
                                ? null
                                : data['selectedSport'];
                            _selectedPlayerCount =
                                data['selectedPlayerCount'] == 0
                                    ? null
                                    : data['selectedPlayerCount'];
                            _broughtPlayerCount =
                                data['broughtPlayerCount'] == 0
                                    ? null
                                    : data['broughtPlayerCount'];
                            _selectedDateTime = data['selectedDateTime'].isEmpty
                                ? null
                                : DateTime.parse(data['selectedDateTime']);
                            _duration = data['duration'].isEmpty
                                ? null
                                : Duration(
                                    seconds: int.parse(data['duration']));
                            _locationController.text = data['location'];
                          },
                        );
                        if (_selectedDateTime != null) {
                          _dateController.text = DateFormat('yyyy-MM-dd HH:mm')
                              .format(_selectedDateTime!);
                        }
                        if (_duration != null) {
                          _durationController.text =
                              '${_duration!.inHours.toString().padLeft(2, '0')}:${(_duration!.inMinutes % 60).toString().padLeft(2, '0')}';
                        }
                        if (context.mounted) {
                          getMessageSnackBar(
                              "Event Template Loaded Successfully!",
                              ScaffoldMessenger.of(context));
                        }
                        break;
                    }
                  },
                ),
              ],
            ),
            body: SingleChildScrollView(
                child: _buildCreateScreen(viewModel, context)),
            floatingActionButton: FloatingActionButton.extended(
              onPressed: viewModel.state == CreateState.loading
                  ? null
                  : () async {
                      viewModel.state = CreateState.loading;
                      viewModel
                          .createEvent(
                              _selectedSport,
                              _selectedPlayerCount,
                              _broughtPlayerCount,
                              _selectedDateTime,
                              _duration,
                              _locationController.text)
                          .then((_) {
                        viewModel.state = CreateState.success;
                        if (context.mounted) {
                          Navigator.pushNamed(context, '/events',
                              arguments: EventsScreenArguments(null));
                          MotionToast.success(
                            position: MotionToastPosition.top,
                            animationType: AnimationType.fromTop,
                            title: const Text(
                              "Event Created Successfully",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            description:
                                const Text('¡Your event has been created!'),
                          ).show(context);
                        }
                      }).onError((e, stackTrace) {
                        MotionToast.error(
                          position: MotionToastPosition.top,
                          animationType: AnimationType.fromTop,
                          title: const Text(
                            "Error",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          description: Text(
                              e is FormatException ? e.message : e.toString()),
                        ).show(context);
                      });
                    },
              backgroundColor: viewModel.state == CreateState.loading
                  ? lightColorScheme.primary.withOpacity(0.8)
                  : lightColorScheme.primary,
              label: viewModel.state == CreateState.loading
                  ? Text(
                      'Creating...',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white.withOpacity(0.8),
                      ),
                    )
                  : const Text('Create',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      )),
              icon: viewModel.state == CreateState.loading
                  ? CircularProgressIndicator(
                      color: Colors.white.withOpacity(0.8),
                      strokeWidth: 3,
                    )
                  : const Icon(
                      Icons.add,
                      color: Colors.white,
                    ),
            ),
            bottomNavigationBar: const BottomNavBar(selectedTab: 1),
          );
        },
      ),
    );
  }

  Widget _buildCreateScreen(viewModel, context) {
    WidgetsBinding.instance.addPostFrameCallback(
      (_) {
        if (_viewModel.isOffline) {
          getMessageSnackBar(
              "There is no internet conenction, your event will be created once you connect back",
              ScaffoldMessenger.of(context));
        }
      },
    );
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Choose the sport',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 5),
            DropdownButton<String>(
              isExpanded: true,
              value: _selectedSport,
              hint: const Text('Select a sport'),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedSport = newValue;
                });
              },
              items: _sports.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
            const SizedBox(height: 15),
            const Text(
              'How many players are needed?',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 5),
            DropdownButton<int>(
              isExpanded: true,
              value: _selectedPlayerCount,
              hint: const Text('Select a number of players'),
              onChanged: (int? newValue) {
                setState(() {
                  _selectedPlayerCount = newValue;
                });
              },
              items: _playerCounts.map<DropdownMenuItem<int>>((int value) {
                return DropdownMenuItem<int>(
                  value: value,
                  child: Text(value.toString()),
                );
              }).toList(),
            ),
            const SizedBox(height: 15),
            const Text(
              'How many players are you bringing?',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 5),
            DropdownButton<int>(
              isExpanded: true,
              value: _broughtPlayerCount,
              hint: const Text('Select the number of players'),
              onChanged: (int? newValue) {
                setState(() {
                  _broughtPlayerCount = newValue;
                });
              },
              items: _playerCounts.map<DropdownMenuItem<int>>((int value) {
                return DropdownMenuItem<int>(
                  value: value,
                  child: Text(value.toString()),
                );
              }).toList(),
            ),
            const SizedBox(height: 15),
            const Text(
              'Select the event\'s date and time',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 5),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _dateController,
                    readOnly: true,
                    decoration: const InputDecoration(
                      hintText: 'Select date and time',
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () async {
                    final DateTime? pickedDate = await showDatePicker(
                      context: context,
                      initialDate: DateTime.now(),
                      firstDate: DateTime.now(),
                      lastDate: DateTime.now().add(const Duration(days: 365)),
                    );

                    if (pickedDate != null && context.mounted) {
                      final TimeOfDay? pickedTime = await showTimePicker(
                        context: context,
                        initialTime: TimeOfDay.now(),
                      );

                      if (pickedTime != null) {
                        setState(() {
                          _selectedDateTime = DateTime(
                            pickedDate.year,
                            pickedDate.month,
                            pickedDate.day,
                            pickedTime.hour,
                            pickedTime.minute,
                          );
                        });
                        _dateController.text = DateFormat('yyyy-MM-dd HH:mm')
                            .format(_selectedDateTime!);
                      }
                    }
                  },
                  icon: const Icon(Icons.calendar_today),
                ),
              ],
            ),
            const SizedBox(height: 15),
            const Text(
              'Duration',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 5),
            GestureDetector(
              onTap: () async {
                Duration? pickedDuration = await showDurationPicker(
                  context: context,
                  initialTime: const Duration(),
                );

                if (pickedDuration != null) {
                  setState(() {
                    _duration = pickedDuration;
                    _durationController.text =
                        '${pickedDuration.inHours.toString().padLeft(2, '0')}:${(pickedDuration.inMinutes % 60).toString().padLeft(2, '0')}';
                  });
                }
              },
              child: AbsorbPointer(
                child: TextField(
                  controller: _durationController,
                  decoration: const InputDecoration(
                    hintText: 'HH:mm',
                  ),
                ),
              ),
            ),
            const SizedBox(height: 15),
            const Text(
              'Event Location',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 5),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: const InputDecoration(
                      hintText: 'Enter event location',
                    ),
                    controller: _locationController,
                  ),
                ),
                IconButton(
                    onPressed: () async {
                      await _showPicker(context, viewModel);
                    },
                    icon: const Icon(Icons.location_pin)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _showPicker(
      BuildContext context, EventCreateViewModel viewModel) async {
    var settings = await Navigator.push(
      context,
      MaterialPageRoute<Map<String, dynamic>>(
        builder: (context) => const MapSettings(),
      ),
    );

    await viewModel.checkConnectionFromView();

    if (settings != null && context.mounted) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => PlacePicker(
            searchForInitialValue: false,
            initialMapType: settings['mapType'],
            apiKey: "AIzaSyDhkoIAmVbfSSY1WtHecpMk7KWB64wFg6s",
            onPlacePicked: (result) {
              _locationController.text = result.formattedAddress ?? '';
              Navigator.of(context).pop();
            },
            initialPosition: settings['useCurrentLocation']
                ? const LatLng(0, 0)
                : const LatLng(4.60140465, -74.0649032880709),
            useCurrentLocation: settings['useCurrentLocation'],
            resizeToAvoidBottomInset: false,
          ),
        ),
      );
    }
  }
}
