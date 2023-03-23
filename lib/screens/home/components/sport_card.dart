import 'package:fit_connect/theme/style.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SportCard extends StatelessWidget {
  final String? title;
  final String? subtitle;
  final double? height;
  final double? width;
  final Function? onTap;
  final String? tag;
  final String? imagePath;

  const SportCard(
      {Key? key,
      this.title,
      this.subtitle,
      this.height,
      this.width,
      this.onTap,
      this.tag,
      this.imagePath})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => onTap!(),
        borderRadius: BorderRadius.circular(26),
        child: Ink(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(26),
              gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    darkColorScheme.secondaryContainer,
                    Colors.transparent
                  ]),
              image: DecorationImage(
                  image: AssetImage(imagePath!),
                  fit: BoxFit.cover,
                  opacity: 0.8)),
          child: SizedBox(
            width: 305,
            child: Stack(
              children: [
                Positioned(
                  bottom: 10,
                  left: 20,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Hero(
                        tag: tag ?? '',
                        child: Material(
                          color: Colors.transparent,
                          child: Text(
                            title!,
                            style: TextStyle(
                                fontSize: 16,
                                fontFamily: GoogleFonts.rubik().fontFamily,
                                fontWeight: FontWeight.bold,
                                color: Colors.white),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      subtitle != null
                          ? Text(
                              subtitle!,
                              style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w300,
                                  color: Colors.white),
                            )
                          : Container(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
