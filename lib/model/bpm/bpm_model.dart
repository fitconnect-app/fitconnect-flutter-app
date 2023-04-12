import 'package:realm/realm.dart';

part 'bpm_model.g.dart';

@RealmModel()
class _BPMDataModel {
  @PrimaryKey()
  late final String id;

  late int? value;
  late DateTime? date;
}
