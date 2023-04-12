import 'package:fit_connect/model/bpm/bpm_model.dart';
import 'package:realm/realm.dart';

class RealmManager {
  static final Configuration _config =
      Configuration.local([BPMDataModel.schema]);
  static Realm? _realm;

  static Realm get realm {
    _realm ??= Realm(_config);
    return _realm!;
  }
}
