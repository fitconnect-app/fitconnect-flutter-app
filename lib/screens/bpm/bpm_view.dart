import 'package:flutter/material.dart';
import 'package:fit_connect/screens/bpm/components/chart.dart';
import 'package:fit_connect/view_model/bpm_view_model.dart';
import 'package:provider/provider.dart';
import 'package:camera/camera.dart';
import 'package:google_fonts/google_fonts.dart';

class BPMView extends StatefulWidget {
  const BPMView({super.key});

  @override
  BPMPageView createState() {
    return BPMPageView();
  }
}

class BPMPageView extends State<BPMView> with SingleTickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text("Heart Rate Monitor",
                style: TextStyle(
                    fontFamily: GoogleFonts.rubik().fontFamily,
                    fontWeight: FontWeight.w700)),
            centerTitle: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back_sharp),
              onPressed: () {
                //TODO: go back to previous screen
              },
            )),
        body: ChangeNotifierProvider<BPMViewModel>(
          create: (_) => BPMViewModel(this),
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
                                      model.controller != null && model.toggled
                                          ? AspectRatio(
                                              aspectRatio: model.controller!
                                                  .value.aspectRatio,
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
                                              ? "Cover both the camera and the flash with your finger"
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
                          child: Transform.scale(
                            scale: model.iconScale,
                            child: IconButton(
                              icon: Icon(model.toggled
                                  ? Icons.favorite
                                  : Icons.favorite_border),
                              color: Colors.red,
                              iconSize: 128,
                              onPressed: () {
                                if (model.toggled) {
                                  model.untoggle();
                                } else {
                                  model.toggle();
                                }
                              },
                            ),
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
        ));
  }
}
