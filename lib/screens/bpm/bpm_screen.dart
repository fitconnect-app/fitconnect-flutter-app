import 'package:async/async.dart';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'package:fit_connect/screens/bpm/components/chart.dart';
import 'package:fit_connect/view_model/bpm_view_model.dart';

class BPMScreen extends StatefulWidget {
  const BPMScreen({super.key});

  @override
  State<BPMScreen> createState() => _BPMScreenState();
}

class _BPMScreenState extends State<BPMScreen>
    with SingleTickerProviderStateMixin, WidgetsBindingObserver {
  late BPMViewModel _viewModel;
  RestartableTimer? _timer;

  @override
  void initState() {
    super.initState();
    _viewModel = BPMViewModel(this);
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    _viewModel.untoggle();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused ||
        state == AppLifecycleState.inactive) {
      _viewModel.untoggle();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text(
            "Heart Rate Monitor",
            style: TextStyle(
                fontFamily: GoogleFonts.rubik().fontFamily,
                fontWeight: FontWeight.w700),
          ),
          centerTitle: true,
          leading: const BackButton(color: Colors.black)),
      body: ChangeNotifierProvider<BPMViewModel>(
        create: (_) => _viewModel,
        child: Scaffold(
          backgroundColor: Colors.white,
          body: SafeArea(
            child: Column(
              children: <Widget>[
                Expanded(
                  flex: 1,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: ClipRRect(
                            borderRadius: const BorderRadius.all(
                              Radius.circular(18),
                            ),
                            child: Consumer<BPMViewModel>(
                              builder: (_, model, __) {
                                return Stack(
                                  fit: StackFit.expand,
                                  alignment: Alignment.center,
                                  children: <Widget>[
                                    (model.controller?.value.isInitialized ??
                                                false) &&
                                            model.toggled
                                        ? AspectRatio(
                                            aspectRatio: model
                                                .controller!.value.aspectRatio,
                                            child: CameraPreview(
                                                model.controller!),
                                          )
                                        : Container(
                                            padding: const EdgeInsets.all(12),
                                            alignment: Alignment.center,
                                            color: Colors.grey,
                                          ),
                                    Container(
                                      alignment: Alignment.center,
                                      padding: const EdgeInsets.all(4),
                                      child: Text(
                                        model.toggled
                                            ? "Cover both the camera and the flash with your wrist or back of your hand"
                                            : "Camera feed will display here",
                                        style: TextStyle(
                                            backgroundColor: model.toggled
                                                ? Colors.white
                                                : Colors.transparent),
                                        textAlign: TextAlign.center,
                                      ),
                                    )
                                  ],
                                );
                              },
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Center(child: Consumer<BPMViewModel>(
                          builder: (_, model, __) {
                            return Column(
                              mainAxisSize: MainAxisSize.min,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: <Widget>[
                                Text(
                                  model.toggled
                                      ? "Estimated BPM\n (Measuring...)"
                                      : "Estimated BPM",
                                  style: const TextStyle(
                                      fontSize: 18, color: Colors.grey),
                                ),
                                Text(
                                  (model.bpm > 30 && model.bpm < 150
                                      ? model.bpm.toString()
                                      : "--"),
                                  style: const TextStyle(
                                      fontSize: 32,
                                      fontWeight: FontWeight.bold),
                                ),
                              ],
                            );
                          },
                        )),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Consumer<BPMViewModel>(
                    builder: (_, model, __) {
                      return Center(
                        child: Column(
                          children: [
                            Transform.scale(
                              scale: model.iconScale,
                              child: IconButton(
                                icon: Icon(model.toggled
                                    ? Icons.favorite
                                    : Icons.favorite_border),
                                color: Colors.red,
                                iconSize: 128,
                                onPressed: () {
                                  if ((_timer?.isActive ?? false)) {
                                    _timer?.reset();
                                  } else {
                                    _timer = RestartableTimer(
                                      const Duration(milliseconds: 300),
                                      () => model.toggled ? model.untoggle() : model.toggle(),
                                    );
                                  }
                                },
                              ),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              model.toggled
                                  ? "Tap the heart to stop measuring"
                                  : "Tap the heart to start measuring",
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.red,
                                fontFamily: GoogleFonts.rubik().fontFamily,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    margin: const EdgeInsets.all(12),
                    decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(
                          Radius.circular(18),
                        ),
                        color: Colors.black),
                    child: Consumer<BPMViewModel>(
                      builder: (_, model, __) {
                        return Chart(model.bpmData);
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
