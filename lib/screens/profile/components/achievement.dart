import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AchievementWidget extends StatelessWidget {
  const AchievementWidget(
      {super.key, required this.name, required this.imagePath});

  final String name;
  final String imagePath;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 112,
          height: 112,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            image:
                DecorationImage(image: CachedNetworkImageProvider(imagePath)),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: 112,
          child: Text(
            name,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.w300,
              fontSize: 16,
              fontFamily: GoogleFonts.rubik().fontFamily,
            ),
          ),
        )
      ],
    );
  }
}
