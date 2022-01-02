import { QR } from 'qr-image/lib/qr-base'

// qr lib was built for node
// here is a barebone buffer polyfill
self.Buffer = function (data) {
  if (typeof data === 'string') {
    let enc = new TextEncoder(); // always utf-8
    return enc.encode(data);
  } else if (typeof data === 'number') {
    return new Uint8Array(data)
  } else if (Array.isArray(data)) {
    return Uint8Array.from(data)
  } else {
    throw new Error("Unsupported buffer data");
  }
}

const generate = function(text) {
  // use higest error correction, so we can embed wifi icon
  let matrix = QR(text, 'H');
  let scale = 6;
  let size = matrix.length * scale;
  let canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  // draw qr code
  matrix.forEach(function(row, y) {
    row.forEach(function(value, x) {
      if (value) {
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    });
  });
  //          wifi icon
  // draw white background
  let radius = size / 2.5;
  let band = radius / 9;
  let center = [size / 2, ((size - radius) / 2) + radius - band];
  // arc from x axis
  let startArc = -Math.PI / 4 * 3; // -135 deg
  let endArc = -Math.PI / 4; // -45 def
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = band * 2;
  ctx.beginPath();
  ctx.arc(center[0], center[1], radius - (band * 2), startArc, endArc);
  ctx.lineTo(center[0], center[1]);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // draw arcs
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
  // draw last nub
  let nub = radius - (band * 8);
  ctx.beginPath();
  ctx.arc(center[0], center[1], nub, startArc, endArc);
  ctx.lineTo(center[0], center[1]);
  ctx.closePath();
  ctx.fill();
  // convert png
  canvas.toBlob(async function(blob) {
    let url = URL.createObjectURL(blob);
    let image = document.querySelector('#qr img');
    image.src = url;
    await image.decode()
    image.setAttribute('height', image.naturalHeight);
    image.setAttribute('width', image.naturalWidth);
  });
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#qr img').addEventListener('click', function() {
    return window.print();
  });
  return document.querySelector('form#wifi').addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
    let ssid = this['ssid'].value;
    let password = this['password'].value;
    let text = `WIFI:T:WPA;S:${ssid};P:${password};;`;
    generate(text);
  });
});
