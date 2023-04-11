import 'package:flutter/material.dart';

void getMessageSnackBar(String message, context) {
  final snackBar = SnackBar(
    content: Text(message),
    action: SnackBarAction(
      label: 'Dismiss',
      onPressed: () {},
    ),
  );
  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}
