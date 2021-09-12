import 'package:flutter/material.dart';

header(context,
    {bool isAppTitle = false, String titleText, removeBackButton = false}) {
  return AppBar(
    automaticallyImplyLeading: removeBackButton ? false : true,
    title: Text(isAppTitle ? 'FlutterShare' : titleText,
        style: TextStyle(
          color: Colors.white,
          fontFamily: isAppTitle ? 'Signatra' : '',
          fontSize: isAppTitle ? 50 : 22,
        )),
    centerTitle: true,
    backgroundColor: Theme.of(context).accentColor,
  );
}
