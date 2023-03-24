import 'dart:async';

import 'package:camera/camera.dart';
import 'package:fit_connect/screens/bpm/components/chart.dart';
import 'package:flutter/material.dart';
import 'package:wakelock/wakelock.dart';

class BPMViewModel extends ChangeNotifier {
  bool _toggled = false;
  final List<SensorValue> _bpmData = <SensorValue>[];
  CameraController? _controller;
  final double _alpha = 0.3;
  double _iconScale = 1;
  int _bpm = 0;
  final int _fs = 30;
  final int _windowLength = 30 * 6;
  CameraImage? _image;
  double? _avg;
  DateTime? _dtNow;
  Timer? _timer;

  AnimationController? _animationController;

  bool get toggled => _toggled;

  List<SensorValue> get bpmData => _bpmData;

  CameraController? get controller => _controller;

  double get alpha => _alpha;

  double get iconScale => _iconScale;

  int get bpm => _bpm;

  int get fs => _fs;

  int get windowLength => _windowLength;

  CameraImage? get image => _image;

  double? get avg => _avg;

  DateTime? get dtNow => _dtNow;

  Timer? get timer => _timer;

  AnimationController? get animationController => _animationController;

  BPMViewModel(view) {
    _animationController = AnimationController(
        duration: const Duration(milliseconds: 500), vsync: view);
    _animationController?.addListener(() {
      _iconScale = 1.0 + _animationController!.value * 0.4;
      notifyListeners();
    });
  }

  void _clearData() {
    bpmData.clear();
    int now = DateTime.now().millisecondsSinceEpoch;
    for (int i = 0; i < windowLength; i++) {
      bpmData.insert(
          0,
          SensorValue(
              DateTime.fromMillisecondsSinceEpoch(now - i * 1000 ~/ fs), 128));
    }
  }

  void toggle() {
    _clearData();
    _initController().then((onValue) {
      Wakelock.enable();
      _animationController?.repeat(reverse: true);
      _toggled = true;
      notifyListeners();
      // after is toggled
      _initTimer();
      _updateBPM();
    });
  }

  void untoggle({dispose = false}) {
    if (_toggled) {
      _disposeController();
      Wakelock.disable();
      _animationController?.stop();
      _animationController?.value = 0.0;
      _toggled = false;
      !dispose ? notifyListeners() : null;
    }
  }

  void _disposeController() {
    _controller?.dispose();
    _controller = null;
  }

  Future<void> _initController() async {
    List cameras = await availableCameras();
    _controller = CameraController(cameras.first, ResolutionPreset.low);
    await _controller?.initialize();
    Future.delayed(const Duration(milliseconds: 100)).then((onValue) {
      _controller?.setFlashMode(FlashMode.torch);
    });
    _controller?.startImageStream((CameraImage image) {
      _image = image;
    });
  }

  void _initTimer() {
    _timer = Timer.periodic(Duration(milliseconds: 1000 ~/ fs), (timer) {
      if (_toggled) {
        if (_image != null) _scanImage(_image!);
      } else {
        timer.cancel();
      }
    });
  }

  void _scanImage(CameraImage image) {
    _dtNow = DateTime.now();
    _avg =
        image.planes.first.bytes.reduce((value, element) => value + element) /
            image.planes.first.bytes.length;
    if (bpmData.length >= windowLength) {
      bpmData.removeAt(0);
    }
    bpmData.add(SensorValue(_dtNow!, 255 - avg!));
    notifyListeners();
  }

  void _updateBPM() async {
    List<SensorValue> values;
    double avg;
    int listLength;
    double min;
    double threshold;
    double bpm;
    int counter;
    int previous;
    while (_toggled) {
      values = List.from(bpmData);
      avg = 0;
      listLength = values.length;
      min = 0;
      for (var value in values) {
        avg += value.value / listLength;
        if (value.value > min) min = value.value;
      }
      threshold = (min + avg) / 2;
      bpm = 0;
      counter = 0;
      previous = 0;
      for (int i = 1; i < listLength; i++) {
        if (values[i - 1].value < threshold && values[i].value > threshold) {
          if (previous != 0) {
            counter++;
            bpm +=
                60 * 1000 / (values[i].time.millisecondsSinceEpoch - previous);
          }
          previous = values[i].time.millisecondsSinceEpoch;
        }
      }
      if (counter > 0) {
        bpm = bpm / counter;
        _bpm = ((1 - alpha) * this.bpm + alpha * bpm).toInt();
        notifyListeners();
      }
      // Wait for a new set of bpmData values
      await Future.delayed(Duration(milliseconds: (1000 * windowLength ~/ fs)));
    }
  }
}
