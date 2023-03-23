import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:duration_picker/duration_picker.dart';

class SportForm extends StatefulWidget {
  @override
  _SportFormState createState() => _SportFormState();
}

class _SportFormState extends State<SportForm> {
  final List<String> _sports = [
    'Football',
    'Basketball',
    'Tennis',
    'Volleyball',
    'Baseball',
  ];

  final List<int> _playerCounts = List.generate(21, (index) => index + 1);

  String? _selectedSport;
  int? _selectedPlayerCount;
  int? _broughtPlayerCount;
  DateTime? _selectedDateTime;

  TextEditingController _dateController = TextEditingController();
  TextEditingController _durationController = TextEditingController();

  TextInputFormatter _timeInputFormatter() {
    return FilteringTextInputFormatter.allow(RegExp(r'^\d{0,2}:\d{0,2}$'));
  }

  @override
  Widget build(BuildContext context) {
    return Form(
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
            hint: const Text('Select the number of players'),
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
            value: _broughtPlayerCount, // Actualizado a una segunda variable
            hint: const Text('Select the number of players'),
            onChanged: (int? newValue) {
              setState(() {
                _broughtPlayerCount =
                    newValue; // Actualizado a una segunda variable
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
                  decoration: InputDecoration(
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
                    lastDate: DateTime.now().add(Duration(days: 365)),
                  );

                  if (pickedDate != null) {
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

                      print(
                          'Selected date and time: ${DateFormat('yyyy-MM-dd HH:mm').format(_selectedDateTime!)}');
                    }
                  }
                },
                icon: Icon(Icons.calendar_today),
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
                initialTime: Duration(),
              );

              if (pickedDuration != null) {
                setState(() {
                  _durationController.text =
                      '${pickedDuration.inHours.toString().padLeft(2, '0')}:${(pickedDuration.inMinutes % 60).toString().padLeft(2, '0')}';
                });
              }
            },
            child: AbsorbPointer(
              child: TextField(
                controller: _durationController,
                decoration: InputDecoration(
                  hintText: 'HH:mm',
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
