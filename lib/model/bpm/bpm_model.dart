import 'package:realm/realm.dart';

part 'bpm_model.g.dart';

@RealmModel()
class _BPMDataModel {
  late int? value;
  late DateTime? date;
}
