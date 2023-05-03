import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:http/http.dart';

class FitConnectCacheManager {

  static final CacheManager _instance = CacheManager(
    Config(
      'fitconnect_cache_manager',
      stalePeriod: const Duration(days: 7),
      maxNrOfCacheObjects: 20,
    ),
  );

  static Future<Response> getData(String url, Map<String, String> headers) async {
    var file = await _instance.getSingleFile(url, headers: headers);
    if (await file.exists()) {
      var res = await file.readAsString();
      return Response(res, 200);
    }
    return Response('', 404);
  }
}