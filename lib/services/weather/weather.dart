import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

Future<int> getTomorrowHumidityInBogota() async {
  final String apiKey = 'YOUR_API_KEY';
  final double latitude = 4.7110;
  final double longitude = -74.0721;
  final String units = 'metric';

  final tomorrow = DateTime.now().add(Duration(days: 1));
  final tomorrowDate = DateFormat('yyyy-MM-dd').format(tomorrow);

  final response = await http.get(Uri.parse(
      'https://api.openweathermap.org/data/2.5/forecast?lat=$latitude&lon=$longitude&appid=$apiKey&units=$units'));

  if (response.statusCode == 200) {
    final parsedJson = jsonDecode(response.body);
    final forecasts = parsedJson['list'];

    for (final forecast in forecasts) {
      final forecastDate = forecast['dt_txt'].substring(0, 10);

      if (forecastDate == tomorrowDate) {
        return forecast['main']['humidity'];
      }
    }
    throw Exception('No se encontró el pronóstico para mañana en Bogotá');
  } else {
    throw Exception('Error al cargar la información del clima');
  }
}

