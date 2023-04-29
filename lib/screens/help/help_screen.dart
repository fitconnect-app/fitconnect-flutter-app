import 'package:fit_connect/theme/style.dart';
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
          centerTitle: true,
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Consumer<HelpViewModel>(builder: (context, viewModel, child) {
            return SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Which sport do you want us to add?',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
                    'Please explain your choices (Optional)',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    keyboardType: TextInputType.multiline,
                    maxLines: null,
                    decoration: const InputDecoration(
                      labelText: 'Response',
                    ),
                    onChanged: (value) {
                      viewModel.featureDetails = value;
                    },
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            );
          }),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {},
          label: const Text("Send Feedback"),
          icon: const Icon(Icons.send),
          backgroundColor: lightColorScheme.primary,
          foregroundColor: Colors.white,
        ),
      ),
    );
  }
}
