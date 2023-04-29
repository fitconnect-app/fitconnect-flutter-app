import 'package:fit_connect/services/sheets/sheetscolumn.dart';
import 'package:gsheets/gsheets.dart';

class SheetsFlutter {
  static const String _sheetId = "1gXQMKMA4ywvonC7Pf4BBtTIamsVCNJmbzy7mwfRoIqE";
  static const _sheetCredentials = r'''
  {
  "type": "service_account",
  "project_id": "fitconnect-be78b",
  "private_key_id": "739cfadbbec4f2d0e02ba36bc1d5467e57818c27",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVop4zCdF2E5O5\nzzKMaUDTQg0xl190KYm0G0S7WDIMGBTuhqCxf8g1J7dgwFGGAX1GHM526u0NIl6a\nPslIiXz1rK+G+wdUOXvEEabxSvYlUbKxhLcxcWRmHro6HanJd1ZHeOHR42H8NALe\ndde29j6VatnWajhFLR8OGW24YUMp8WVFAhiNFe48qRdOh1LH+wTC4MHeaThc/WrC\nulv4rHJ49/sDXk0K/edtl8NGWQ6JHfXckF9/QRf89qOW6iSDrBoO0jJi81XkjJoF\n2Wg9f1iJECmKAijoXE5tWli9Rw508ja2h7uvrZdxmcNnreDl/lk1/GZA7v239tuB\nefFz2JXnAgMBAAECggEALJeKfO3GNmbEtYqdqvhHSzFkzp6hkn4fG6R7dr1kiOi3\n6cfZH+OjtxCosr3B5n5GF03o/KJxw4WSiJCldAoatq8KXlrkfzyWbGkg1wnGEikY\n6vvgPyZDhhtQ1NOfPom1zSpavHRBXiK/HI8tbSe+DXMlsB8wyqOt8UP2hn9qxQSX\noK9MjlKrPOE9/RliOyXNBYb1/mFy8HceMvjpVszuYYK3Mf9DqN+iivlKPGNIgNBw\n8kO44y3g1bVfdauOeYmvvr8OVgq63dUml9EZJKhfvxeDi/Irl5IxJQponPk5LoQb\nz4D3K+m61+7rgRhRQF/+PBGDx5SRGRb8LFkWK+CFDQKBgQD97KXyG4o3TxzLCtM7\nxecW/MJMAffPTXqaat6CarhXOAzZK9RdfNqVZ64+KEGtD7PmuxK4i9BVkMpOffL6\ntQ8U9Bsj2QvwaERzRH/nXVB8112zx9jd4d8LISKRQgKEYn5bVFi3z7iFBbyokVvJ\nUJv4lNHTNyUehcrrgxcmqvBRewKBgQDXYamJuEC+nldBUdXE5jY/Uu8OnkHLr4jT\nzbpKIBsaczE0EywSdFqOhhttOcKDopYgQn/ZJOM5ZWKqbuQg2cEuAV7YnxZJUczp\nLVE2vCFDn6unoeJ8yB5/9IqKI4eSCjG3EQ/j520UtfUWkfFLz6MF/IryFeZEaJAN\nnKfkyexzhQKBgQDEnM1tZsehxd8clHg0yysBEJt9cPSpjmuFT4SU5P9xgVPpgFeC\nP9+cWdiABnm7//GjkWyQeqnI50DOgBV47GMOLWkqW7Az6Pg/bGXBBu8Ai13hi7ev\nLmqe2nxCjyMV0JHYM7oyMWPFlEidGVhBy+nJE6pYalWSibQyoaF2bluAKwKBgQC7\nUZ8Hvg3hOwkcMDZBJw8rB9AN4KnMon/X5ecNLNslp+W1Kq975WIU7qHP3xpDLhZv\nPCbBDgnpEzo6jHMv9vLCNkLtF39kiRYz/kvR1NEBZU7/XhYC/HE6S85p0fjIlMEk\nPFybk90U1COyW3+GtbFNNZUKcu1vtZkDnamPm+ZfmQKBgQDBOq+w5EV/n37P1s4H\nU/597O71YmWtm5yDYdj0AWi+1vc4R2CcPgsTYl/46Cn9EZeNjuYwO582oR62Gfjb\n5pba9CJR4KHhB5NEkJwpzhTfYzLtlFPQHAXE3M9RQB+JXvB25nPyQMwpzDyF7t8D\noS79F+tX/Bu4u2vWi3/sm4S+7Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "fluttersheets@fitconnect-be78b.iam.gserviceaccount.com",
  "client_id": "110070775011946718925",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/fluttersheets%40fitconnect-be78b.iam.gserviceaccount.com"
  }
''';
  static Worksheet? _userSheet;
  static final _gsheets = GSheets(_sheetCredentials);

  static Future init() async {
    try {
      final spreadsheet = await _gsheets.spreadsheet(_sheetId);

      _userSheet = await _getWorkSheet(spreadsheet, title: "Feed");
      final firstRow = SheetsColumn.getColumns();
      _userSheet!.values.insertRow(1, firstRow);
    } catch (e) {
      return;
    }
  }

  static Future<Worksheet> _getWorkSheet(
    Spreadsheet spreadsheet, {
    required String title,
  }) async {
    try {
      return await spreadsheet.addWorksheet(title);
    } catch (e) {
      return spreadsheet.worksheetByTitle(title)!;
    }
  }

  static Future insert(List<Map<String, dynamic>> rowList) async {
    if (_userSheet == null) {
      await init();
    }
    _userSheet!.values.map.appendRows(rowList);
  }
}