(function() {
  var generate;

  importScripts('/bundle.40ea7b5cdec8121ee2df.js');

  generate = function(data) {
    var canvas, ctx, matrix, radius, scale, size;
    matrix = qr.matrix(data.text, 'H');
    scale = 4;
    size = matrix.length * scale;
    canvas = new OffscreenCanvas(size, size);
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
    ctx.translate(size / 2, (size / 2) + (radius / 2));
    ctx.rotate(Math.PI / -4);
    // overlay wi-fi logo
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, radius, -Math.PI / 2, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    
    // radius = radius - scale
    ctx.lineWidth = Math.floor(size / 25);
    ctx.strokeStyle = '#aaa';
    ctx.beginPath();
    ctx.arc(scale, -scale, radius * .75, -Math.PI / 2, 0);
    ctx.stroke();
    // ctx.strokeStyle = 'green'
    ctx.beginPath();
    ctx.arc(scale, -scale, radius * .55, -Math.PI / 2, 0);
    ctx.stroke();
    // ctx.strokeStyle = 'blue'
    ctx.beginPath();
    ctx.arc(scale, -scale, radius * .35, -Math.PI / 2, 0);
    ctx.stroke();
    return canvas.convertToBlob({
      type: 'image/png'
    }).then(function(blob) {
      var url;
      url = URL.createObjectURL(blob);
      return self.postMessage({
        promiseId: data.promiseId,
        url: url,
        status: 201
      });
    });
  };

  self.addEventListener('message', function(e) {
    switch (e.data.cmd) {
      case 'generate':
        return generate(e.data);
    }
  });

}).call(this);
