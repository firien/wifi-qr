import { QR } from 'qr-image/lib/qr-base'
import wifiConfig from '../javascripts/wifi.js'

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
  let [x, y] = [size / 2, ((size - radius) / 2) + radius - band];
  // arc from x axis
  let startArc = Math.PI / -2; // -90 deg
  let endArc = 0; // 0 deg
  ctx.fillStyle = 'white';
  ctx.translate(x, y);
  ctx.rotate(Math.PI / -4);
  ctx.translate(-x, -y);
  ctx.beginPath();
  let padding = band;
  let a = Math.asin(padding / (radius - band))
  ctx.arc(x, y, radius - band, startArc - a, a);
  ctx.lineTo(x-padding, y+padding);
  ctx.closePath();
  ctx.fill();
  // draw arcs
  ctx.fillStyle = '#bbb';
  for (let i=3; i<8; i=i+2) {
    let r1 = radius - (band * i)
    let r2 = radius - (band * (i-1))
    ctx.beginPath();
    ctx.arc(x, y, r2, endArc, startArc, true);
    ctx.lineTo(x, y - r1);
    ctx.arc(x, y, r1, startArc, endArc);
    ctx.closePath()
    ctx.fill();
  }
  // draw last nub
  let nub = radius - (band * 8);
  ctx.beginPath();
  ctx.arc(x, y, nub, startArc, endArc);
  ctx.lineTo(x, y);
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
  document.querySelector('#qr img').addEventListener('click', () => window.print());
  document.querySelector('form#wifi').addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
    let ssid = this['ssid'].value;
    let password = this['password'].value;
    let text = wifiConfig('WPA', ssid, password);
    generate(text);
  });
});
