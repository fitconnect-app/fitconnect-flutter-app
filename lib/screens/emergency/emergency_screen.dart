import 'package:dotlottie_loader/dotlottie_loader.dart';
import 'package:fit_connect/components/message_snack_bar.dart';
import 'package:fit_connect/theme/style.dart';
import 'package:fit_connect/view_model/emergency_view_model.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';
import 'package:provider/provider.dart';
import 'package:slider_button/slider_button.dart';

class EmergencyScreen extends StatefulWidget {
  const EmergencyScreen({Key? key}) : super(key: key);

  @override
  State<EmergencyScreen> createState() => _EmergencyScreenState();
}

class _EmergencyScreenState extends State<EmergencyScreen> {
  late EmergencyViewModel _viewModel;

  @override
  void dispose() {
    _viewModel.closeEmergencyStream();
    super.dispose();
  }

  void _sendHelpRequest() async {
    await _viewModel.sendHelpRequest();
  }

  @override
  Widget build(BuildContext context) {
    if (mounted) {
      setState(() {
        _viewModel = EmergencyViewModel();
      });
    }
    return ChangeNotifierProvider<EmergencyViewModel>(
      create: (context) => _viewModel,
      child: Consumer<EmergencyViewModel>(builder: (context, viewModel, child) {
        if (viewModel.state == EmergencyState.isLoading) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        } else {
          WidgetsBinding.instance.addPostFrameCallback(
            (_) {
              if (viewModel.isOffline &&
                  !viewModel.wasOfflineNotified &&
                  viewModel.state == EmergencyState.isWaiting) {
                getMessageSnackBar(
                    "There is no internet connection, your help request will be automatically created once you connect back",
                    ScaffoldMessenger.of(context));
                viewModel.toggleWasOfflineNotified();
              }
            },
          );
          return Scaffold(
            appBar: AppBar(
              title: Text(
                'Emergency',
                style: TextStyle(
                  fontFamily: GoogleFonts.rubik().fontFamily,
                  fontWeight: FontWeight.w700,
                ),
              ),
              centerTitle: true,
            ),
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (viewModel.state == EmergencyState.isInitialized)
                    Expanded(
                      child: Column(
                        children: [
                          const Padding(
                            padding: EdgeInsets.symmetric(
                                horizontal: 50, vertical: 30),
                            child: Column(
                              children: [
                                Text(
                                  'Please read the instructions below before requesting help',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
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
                                SizedBox(height: 20),
                                Text(
                                  'Please remember to activate your GPS to allow us to locate you easier',
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.black,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(
                            width: 200,
                            child: DotLottieLoader.fromAsset(
                              'assets/animations/alert.lottie',
                              frameBuilder:
                                  (BuildContext ctx, DotLottie? dotlottie) {
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
                          Container(
                            constraints: const BoxConstraints(maxWidth: 300),
                            child: DropdownButtonFormField<String>(
                              decoration: const InputDecoration(
                                labelText: 'Reason',
                                border: OutlineInputBorder(),
                              ),
                              items: const [
                                DropdownMenuItem(
                                  value: 'General Accident',
                                  child: Text('General Accident'),
                                ),
                                DropdownMenuItem(
                                  value: 'Medical Emergency',
                                  child: Text('Medical Emergency'),
                                ),
                                DropdownMenuItem(
                                  value: 'Facility Damage',
                                  child: Text('Facility Damage'),
                                ),
                                DropdownMenuItem(
                                  value: 'Natural Disaster',
                                  child: Text('Natural Disaster'),
                                ),
                              ],
                              onChanged: (String? value) {
                                viewModel.setReason(value);
                              },
                            ),
                          ),
                          const SizedBox(height: 40),
                          SliderButton(
                            action: _sendHelpRequest,
                            label: const Text(
                              'Slide to request help',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 14,
                              ),
                            ),
                            icon: const Icon(
                              Icons.keyboard_double_arrow_right,
                              color: Colors.white,
                              size: 50,
                            ),
                            buttonColor:
                                lightColorScheme.tertiary.withOpacity(1),
                            backgroundColor:
                                lightColorScheme.tertiary.withOpacity(0.4),
                            baseColor:
                                lightColorScheme.secondary.withOpacity(0.7),
                          ),
                        ],
                      ),
                    ),
                  if (viewModel.state == EmergencyState.isWaiting)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 60, vertical: 60),
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
                                  'assets/animations/rest-wait.lottie',
                                  frameBuilder:
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
                  if (viewModel.state == EmergencyState.isAdminApproved)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 60, vertical: 60),
                        child: Column(
                          children: [
                            const Text(
                              'Congratulations, an administrator has approved your request and it\'s on its way',
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
      }),
    );
  }
}
