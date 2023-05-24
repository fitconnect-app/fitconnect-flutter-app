import 'package:dotlottie_loader/dotlottie_loader.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:slider_button/slider_button.dart';

class EmergencyScreen extends StatefulWidget {
  const EmergencyScreen({Key? key}) : super(key: key);

  @override
  State<EmergencyScreen> createState() => EmergencyScreenState();
}

class EmergencyScreenState extends State<EmergencyScreen> {
  bool _isWaiting = false;
  bool _isAdminApproved = false;

  @override
  void initState() {
    super.initState();

    // _firebaseMessaging.configure(
    //   onMessage: (message) async {
    //     // Handle notification received when admin approves the request
    //     if (message.data['status'] == 'approved') {
    //       setState(() {
    //         _isAdminApproved = true;
    //       });
    //     }
    //   },
    // );
  }

  void _sendHelpRequest() {
    // Publish a message to the emergency topic using GCP Pub/Sub
    // Implement the Pub/Sub logic here
    setState(() {
      _isWaiting = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Emergency'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (!_isWaiting && !_isAdminApproved)
              Expanded(
                child: Column(
                  children: [
                    const Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 60, vertical: 30),
                      child: Column(
                        children: [
                          Text(
                            'Please read the instructions below before requesting help:',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 18),
                          ),
                          SizedBox(height: 20),
                          Text(
                            'IMPORTANT: This emergency section should only be used in genuine emergency situations.',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.red,
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      width: 200,
                      child: DotLottieLoader.fromAsset(
                        'assets/animations/alert.lottie',
                        frameBuilder: (BuildContext ctx, DotLottie? dotlottie) {
                          if (dotlottie != null) {
                            return Lottie.memory(
                                dotlottie.animations.values.single);
                          } else {
                            return Container();
                          }
                        },
                      ),
                    ),
                    const SizedBox(height: 30),
                    DropdownButtonFormField<String>(
                      decoration: const InputDecoration(
                        labelText: 'Reason',
                        border: OutlineInputBorder(),
                      ),
                      items: const [
                        DropdownMenuItem(
                          value: 'Accident',
                          child: Text('Accident'),
                        ),
                        DropdownMenuItem(
                          value: 'Medical Emergency',
                          child: Text('Medical Emergency'),
                        ),
                        DropdownMenuItem(
                          value: 'Natural Disaster',
                          child: Text('Natural Disaster'),
                        ),
                        DropdownMenuItem(
                          value: 'Facility Damage',
                          child: Text('Facility Damage'),
                        ),
                      ],
                      onChanged: (String? value) {
                        // Handle the selected value here
                      },
                    ),
                    const SizedBox(height: 20),
                    SliderButton(
                      action: _sendHelpRequest,
                      label: const Text(
                        'Slide to request help',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      icon: const Icon(
                        Icons.keyboard_double_arrow_right,
                        color: Colors.white,
                        size: 50,
                      ),
                      buttonColor: lightColorScheme.tertiary.withOpacity(1),
                      backgroundColor:
                          lightColorScheme.tertiary.withOpacity(0.4),
                      baseColor: lightColorScheme.secondary.withOpacity(0.7),
                    ),
                  ],
                ),
              ),
            if (_isWaiting)
              Expanded(
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 60, vertical: 60),
                  child: Column(
                    children: [
                      const Text(
                        'Please wait until an administrator can be reached',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 20),
                      ),
                      const SizedBox(height: 130),
                      Transform.scale(
                        scale: 2,
                        child: DotLottieLoader.fromAsset(
                            'assets/animations/rest-wait.lottie', frameBuilder:
                                (BuildContext ctx, DotLottie? dotlottie) {
                          if (dotlottie != null) {
                            return Lottie.memory(
                                dotlottie.animations.values.single);
                          } else {
                            return Container();
                          }
                        }),
                      ),
                    ],
                  ),
                ),
              ),
            if (_isAdminApproved)
              Expanded(
                child: Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 60, vertical: 60),
                  child: Column(
                    children: [
                      const Text(
                        'Congratulations, an admin has approved your request and it\'s on its way',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 20),
                      ),
                      const SizedBox(height: 100),
                      Transform.scale(
                        scale: 1.5,
                        child: DotLottieLoader.fromAsset(
                            'assets/animations/meditation-wait-please.lottie',
                            frameBuilder:
                                (BuildContext ctx, DotLottie? dotlottie) {
                          if (dotlottie != null) {
                            return Lottie.memory(
                              dotlottie.animations.values.single,
                            );
                          } else {
                            return Container();
                          }
                        }),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}