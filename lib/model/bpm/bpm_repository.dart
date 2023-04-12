import 'package:fit_connect/model/bpm/bpm_model.dart';
import 'package:fit_connect/services/realm/singleton.dart';
import 'package:realm/realm.dart';

class BPMDataRepository {
  final Realm _realm = RealmManager.realm;

  List<BPMDataModel> getRecentBPMData() {
    final DateTime now = DateTime.now().toUtc();
    final DateTime lastWeek = now.subtract(const Duration(days: 7));

    var list = _realm.query<BPMDataModel>('date BETWEEN {$lastWeek, $now}').toList();
    for (var item in list) {
      item.date = item.date!.toLocal();
    }
    return list;
  }

  BPMDataModel createBPMData(BPMDataModel bpmData) {
    bpmData.date = bpmData.date!.toUtc();
    _realm.write(() => _realm.add(bpmData));
    return bpmData;
  }

  void deleteBPMData(BPMDataModel bpmData) {
    _realm.write(() => _realm.delete(bpmData));
  }
}
