import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fit_connect/view_model/help_view_model.dart';

class HelpScreen extends StatelessWidget {
  const HelpScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<HelpViewModel>(
      create: (context) => HelpViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Add Feature'),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Consumer<HelpViewModel>(
            builder: (context, viewModel, child) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Which sport do you want us to add?',
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField(
                    items: const [
                      DropdownMenuItem(
                        value: 'Martial Arts',
                        child: Text('Martial Arts'),
                      ),
                      DropdownMenuItem(
                        value: 'Swimming',
                        child: Text('Swimming'),
                      ),
                      DropdownMenuItem(
                        value: 'Ping Pong',
                        child: Text('Ping Pong'),
                      ),
                      DropdownMenuItem(
                        value: 'Athletics',
                        child: Text('Athletics'),
                      ),
                      DropdownMenuItem(
                        value: 'Padel',
                        child: Text('Padel'),
                      ),
                    ],
                    onChanged: (value) {
                      viewModel.selectedSport = value;
                    },
                    value: viewModel.selectedSport,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Which feature do you want us to add?',
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField(
                    items: const [
                      DropdownMenuItem(
                        value: 'Map with location',
                        child: Text('Map with location'),
                      ),
                      DropdownMenuItem(
                        value: 'QR code to see exercise guides',
                        child: Text('QR code to see exercise guides'),
                      ),
                      DropdownMenuItem(
                        value: 'Find people near you',
                        child: Text('Find people near you'),
                      ),
                    ],
                    onChanged: (value) {
                      viewModel.selectedFeature = value;
                    },
                    value: viewModel.selectedFeature,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Please provide details about your request',
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(
                      labelText: 'Which sport do you want us to add?',
                    ),
                    onChanged: (value) {
                      viewModel.sportDetails = value;
                    },
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(
                      labelText: 'Which feature do you want us to add?',
                    ),
                    onChanged: (value) {
                      viewModel.featureDetails = value;
                    },
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(
                      labelText: 'Help and Requests',
                      border: OutlineInputBorder(),
                    ),
                    onChanged: (value) {
                      viewModel.helpDetails = value;
                    },
                    maxLines: null,
                  ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  viewModel.submitRequest();
                },
                child: const Padding(
                  padding: EdgeInsets.symmetric(vertical: 16),
                  child: Text(
                    'Submit Request',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
