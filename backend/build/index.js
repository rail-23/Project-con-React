"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.listen(3500);
console.log('!felicidades el servidor del backend puerto!', 3500);
////servidor donde corre el backend