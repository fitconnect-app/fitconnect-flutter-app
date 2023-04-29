import 'dart:isolate';

import 'package:fit_connect/model/bpm/bpm_repository.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OnInitService {
  static late SharedPreferences preferences;
  static final BPMDataRepository bpmDataRepository = BPMDataRepository();

  static void init() {
    SharedPreferences.getInstance().then(
      (prefs) {
        preferences = prefs;
        bool cleanUpPreference =
            preferences.getBool("settingsCleanOnStartup") ?? true;
        Isolate.spawn(
          cleanBPMOnStartup,
          [ReceivePort().sendPort, cleanUpPreference],
        );
      },
    );
  }

  static void cleanBPMOnStartup(List<dynamic> args) {
    SendPort sendPort = args[0];
    bool cleanUpPreference = args[1];
    if (cleanUpPreference) {
      var data = bpmDataRepository.getOldData();
      if (data.isNotEmpty) {
        bpmDataRepository.deleteManyBPMData(data);
      }
    }
    sendPort.send("Old BPM Data Cleanup Done");
  }
}
