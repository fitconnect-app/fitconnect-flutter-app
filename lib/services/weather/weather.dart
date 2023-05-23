import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Object> getHumidity(DateTime dateTime) async {
  const String apiKey = '3db658571158dea7845186f549b77f21';
  const String lat = '4.7110';
  const String lon = '-74.0721';
  const String url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=$lat&lon=$lon&appid=$apiKey&units=metric';

  http.Response response = await http.get(Uri.parse(url));
  if (response.statusCode == 200) {
    Map<String, dynamic> data = jsonDecode(response.body);
    List<dynamic> forecasts = data['list'];

    for (final forecast in forecasts) {
      DateTime forecastDateTime = DateTime.parse(forecast['dt_txt']);
      if (forecastDateTime.year == dateTime.year &&
          forecastDateTime.month == dateTime.month &&
          forecastDateTime.day == dateTime.day &&
          forecastDateTime.hour >= dateTime.hour) {
        return forecast['weather'][0]['main'] == "Rain" ? true : false;
      }
    }
  }

  return Future.error(
      'No se encontró la humedad para la fecha y hora proporcionada');
}
