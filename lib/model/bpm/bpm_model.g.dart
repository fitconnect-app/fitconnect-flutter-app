// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'bpm_model.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class BPMDataModel extends _BPMDataModel
    with RealmEntity, RealmObjectBase, RealmObject {
  BPMDataModel(
    String id, {
    int? value,
    DateTime? date,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'value', value);
    RealmObjectBase.set(this, 'date', date);
  }

  BPMDataModel._();

  @override
  String get id => RealmObjectBase.get<String>(this, 'id') as String;
  @override
  set id(String value) => throw RealmUnsupportedSetError();

  @override
  int? get value => RealmObjectBase.get<int>(this, 'value') as int?;
  @override
  set value(int? value) => RealmObjectBase.set(this, 'value', value);

  @override
  DateTime? get date =>
      RealmObjectBase.get<DateTime>(this, 'date') as DateTime?;
  @override
  set date(DateTime? value) => RealmObjectBase.set(this, 'date', value);

  @override
  Stream<RealmObjectChanges<BPMDataModel>> get changes =>
      RealmObjectBase.getChanges<BPMDataModel>(this);

  @override
  BPMDataModel freeze() => RealmObjectBase.freezeObject<BPMDataModel>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(BPMDataModel._);
    return const SchemaObject(
        ObjectType.realmObject, BPMDataModel, 'BPMDataModel', [
      SchemaProperty('id', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('value', RealmPropertyType.int, optional: true),
      SchemaProperty('date', RealmPropertyType.timestamp, optional: true),
    ]);
  }
}
