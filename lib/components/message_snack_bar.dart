import 'package:flutter/material.dart';

void getMessageSnackBar(
    String message, ScaffoldMessengerState scaffoldMessengerState) {
  final snackBar = SnackBar(
    content: Text(
      message,
    ),
    action: SnackBarAction(
      label: 'Dismiss',
      onPressed: () {},
    ),
  );
  scaffoldMessengerState
      .showSnackBar(snackBar)
      .closed
      .then((value) => scaffoldMessengerState.clearSnackBars());
}
