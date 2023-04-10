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
  final EventViewModel _eventViewModel = EventViewModel();
  DateTime? _selectedDateTime;
  Duration? _duration;

  final TextEditingController _dateController = TextEditingController();
  final TextEditingController _durationController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create an Event'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
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
                          lastDate:
                              DateTime.now().add(const Duration(days: 365)),
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
                            _dateController.text =
                                DateFormat('yyyy-MM-dd HH:mm')
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
                TextField(
                  decoration: const InputDecoration(
                    hintText: 'Enter event location',
                  ),
                  controller: _locationController,
                ),
                const SizedBox(height: 15),
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          try {
            await _eventViewModel.createEvent(
                _selectedSport,
                _selectedPlayerCount,
                _broughtPlayerCount,
                _selectedDateTime,
                _duration,
                _locationController.text);

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
                description: const Text('¡Your event has been created!'),
              ).show(context);
            }
          } catch (e) {
            MotionToast.error(
              position: MotionToastPosition.top,
              animationType: AnimationType.fromTop,
              title: const Text(
                "Error",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              description: Text(e.toString()),
            ).show(context);
          }
        },
        label: const Text('Create',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            )),
        icon: const Icon(
          Icons.add,
          color: Colors.white,
        ),
        backgroundColor: lightColorScheme.primary,
      ),
      bottomNavigationBar: const BottomNavBar(selectedTab: 1),
    );
  }
}
