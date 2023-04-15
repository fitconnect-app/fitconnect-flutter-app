import 'dart:isolate';
import 'package:fit_connect/model/bpm/bpm_repository.dart';

final BPMDataRepository bpmDataRepository = BPMDataRepository();

void cleanOnStartup(SendPort sendPort) {
  var data = bpmDataRepository.getOldData();
  if (data.isNotEmpty) {
    bpmDataRepository.deleteManyBPMData(data);
  }
  sendPort.send("CleanUp Done");
}
