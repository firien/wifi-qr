(function() {
  var generate;

  generate = function(text) {
    var band, canvas, center, ctx, endArc, matrix, nub, radius, scale, size, startArc;
    matrix = QR(text, 'H');
    scale = 6;
    size = matrix.length * scale;
    canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    matrix.forEach(function(row, y) {
      return row.forEach(function(value, x) {
        if (value) {
          return ctx.fillRect(x * scale, y * scale, scale, scale);
        }
      });
    });
    radius = size / 2.5;
    band = radius / 9;
    center = [size / 2, ((size - radius) / 2) + radius - band];
    startArc = -Math.PI / 4 * 3;
    endArc = -Math.PI / 4;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = band * 2;
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius - (band * 2), startArc, endArc);
    ctx.lineTo(center[0], center[1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = band;
    ctx.strokeStyle = '#bbb';
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius - (band * 2.5), startArc, endArc);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius - (band * 4.5), startArc, endArc);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius - (band * 6.5), startArc, endArc);
    ctx.stroke();
    ctx.fillStyle = '#bbb';
    nub = radius - (band * 8);
    ctx.beginPath();
    ctx.arc(center[0], center[1], nub, startArc, endArc);
    ctx.lineTo(center[0], center[1]);
    ctx.closePath();
    ctx.fill();
    return canvas.toBlob(function(blob) {
      return window.requestAnimationFrame(function() {
        var destination, image, url;
        url = URL.createObjectURL(blob);
        image = new Image();
        destination = document.querySelector('#qr');
        while (destination.firstChild) {
          destination.removeChild(destination.firstChild);
        }
        destination.appendChild(image);
        image.onload = function() {
          this.setAttribute('height', this.naturalHeight);
          return this.setAttribute('width', this.naturalWidth);
        };
        return image.src = url;
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    return document.querySelector('form#wifi').addEventListener('submit', function(e) {
      var password, ssid, text;
      e.preventDefault();
      e.stopPropagation();
      // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
      ssid = this['ssid'].value;
      password = this['password'].value;
      text = `WIFI:T:WPA;S:${ssid};P:${password};;`;
      return generate(text);
    });
  });

}).call(this);
