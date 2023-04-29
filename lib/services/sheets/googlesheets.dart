import 'package:fit_connect/services/sheets/sheetscolumn.dart';
import 'package:gsheets/gsheets.dart';

class SheetsFlutter {
  static const String _sheetId = "1gXQMKMA4ywvonC7Pf4BBtTIamsVCNJmbzy7mwfRoIqE";
  static const _sheetCredentials = r'''
{
  "type": "service_account",
  "project_id": "fiery-cabinet-385203",
  "private_key_id": "ce139b32f78d414c97f1cc6e7b5af7473d47a3d9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDqeFkx1nASbhHJ\n9ThLaAZA34pH9+TxH7sGgglC3eBp4VOGIyjw7pr5EXB8u+iWyOYZmfSK8psOO+dc\nlGmVcuZcmXte6WlM+7WHzVDoTCD2eNpeXv2AihR52UPsYzEjvMbl9OtR/zeU2kzF\n7/IL5Au/84+EeTmr496EwCBv7Xsq70R0YnwJWQqZiArmEG/doYnwBcHG56q7vJF1\nghPsQEjZyNXpIj34nPA+tQZ6zOwaVelC5W0Q178GJzGfQxjRv7ekb7MHLFB//8hd\njHw8gC2KmgTmszWOsfbQAkjKjANRbBn2/IIEzNRu+VV5VZONRTsM4SuOsJAo9s8K\neVMFF3nZAgMBAAECggEANlpaMOGpHriZ0pOQLnjJlFHNnDPUxGmq4Q4VaAUHr/u+\nMTbm1300ex7mEOA9gXDGWHJ2PByTwae00SMNW8nkKVyh+wVINgKWmQnJIuR88q3e\nzygdg2Xe68UoB/0Rh9uLzwRo5Zvwbkbxq6PdHBEMAT4Mi7TPX++lpmfkTRYD6pZV\nkNRTW0n17QscDFIyLaFDPgQTkm2xpTp5Lc8LI8CzTHbMh3YEGyPqRfBS6wGR0rlM\nGsa8+hvann12C6ADwZ+DXBAv3FrDKx7J3kpH93h81K28AdMqvJ6N0yHglt0IBDW1\nQ4cAKddM7IRFNwFHBY0qdYHEQjX0ckWGMWMWAVMq9QKBgQD5ORphurMcr2HkKI2O\nsDZLagtd7hwhyR/JlC6xOX31gipJ6hdnZDQZBl3lcuO9fEq01xv48LfSFHuyS6AR\nzmvyXeP8ijePUsNB3pS92hrcVb15JyIekmm2pKw7JJBCx8eXIkuXsq+f2IYIBXuC\nn+f7Wj8bnN+sXGUaYw+M4cDZ7QKBgQDw2Iv8o79MdantK8lZZtJiokgptjz8OG1U\nrgqFEIK4w4rMRvxR+HS69sOkOZDcry/0bvlvmGDbGyEz/oTLhxha96q3Fv6g86Q3\nYXBH4+X61vOT4cmfci6A9QKjfTgzqFYrHE1VOWhIkCUchZu+TX13mNkCB8+bRisi\n1oO9DpiyHQKBgQDkc8bOLSFAuzfluJLCaJ7slGGlEb6x7bZ4xp/ijwv6f/4Z0T7w\n5Lao9eAekylWKdglW0Xl9WrbZTFaZ95sVCc5fX2eomh5tekMuWbpfUPAE8xigU/S\nbG4BIYRLlqGyxYUc8jAO95nr0cRTGAt22vQAwWI2AqA6VFvNS18Wyl5IpQKBgBrl\npCSPyPJqBZMmG7NvRzmatAJshr0INDWLxkL8CA1IUTzlBJLG84pZupmhkCsFKY7b\nweGTm+V8TyX2W7A7Ix4toJQX7lHdQ86nhBmTOwDbdpJiWdkDsGvYcPX/KwKh3xWr\ncHt/EMVhy7M2vKDxGHz9xeZzJt1JZdHbMRUxBx6FAoGBAOEhVQCy11aorwqbW+Ah\nj4x7HwHcWT8U6de8mGp60OTk0A74wQlz+K+FEYJi/pmjwzQMA4n+iEGKrDBDEGu0\nkXVL+yUABDNPr+ih5kraZ4e+5Eq4+tkish+DgYKkcknvb6iB11aXt/iEyF+aqtrD\nt/Z4mReRw/67YP/gYKT0AQGa\n-----END PRIVATE KEY-----\n",
  "client_email": "fluttersheetsfitconnect@fiery-cabinet-385203.iam.gserviceaccount.com",
  "client_id": "101952244490174923219",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/fluttersheetsfitconnect%40fiery-cabinet-385203.iam.gserviceaccount.com"
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
