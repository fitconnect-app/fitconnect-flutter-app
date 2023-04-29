import 'package:fit_connect/components/bottom_nav_bar.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:motion_toast/resources/arrays.dart';
import 'package:provider/provider.dart';
import 'package:fit_connect/view_model/help_view_model.dart';

class HelpScreen extends StatefulWidget {
  const HelpScreen({Key? key}) : super(key: key);

  @override
  State<HelpScreen> createState() => HelpScreenState();
}

class HelpScreenState extends State<HelpScreen> {
  late HelpViewModel viewModel;

  @override
  void initState() {
    viewModel = HelpViewModel();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<HelpViewModel>(
      create: (context) => viewModel,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Features Feedback'),
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
                      labelText: 'Feedback',
                    ),
                    onChanged: (value) {
                      viewModel.feedback = value;
                    },
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            );
          }),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () async {
            try {
              await viewModel.sendFeedback();
              if (viewModel.isOffline && context.mounted) {
                getMessageSnackBar(
                  "There is no internet connection, can't send feedback!",
                  ScaffoldMessenger.of(context),
                );
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
                description:
                    Text(e is FormatException ? e.message : e.toString()),
              ).show(context);
            }
          },
          label: const Text("Send Feedback"),
          icon: const Icon(Icons.send),
          backgroundColor: lightColorScheme.primary,
          foregroundColor: Colors.white,
        ),
        bottomNavigationBar: const BottomNavBar(selectedTab: 2),
      ),
    );
  }
}