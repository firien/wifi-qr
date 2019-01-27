generate = (text) ->
  matrix = QR(text, 'H')
  scale = 6
  size = matrix.length * scale
  canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  matrix.forEach((row, y) ->
    row.forEach((value, x) ->
      if value
        ctx.fillRect(x*scale, y*scale, scale, scale)
    )
  )
  radius = size / 2.5
  band   = radius / 9
  center = [size / 2, ((size - radius) / 2) + (radius) - band]
  startArc = -Math.PI / 4 * 3
  endArc = -Math.PI / 4
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'white'
  ctx.lineWidth = band * 2
  ctx.beginPath()
  ctx.arc(center[0], center[1], radius - (band * 2), startArc, endArc)
  ctx.lineTo(center[0], center[1])
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.lineWidth = band
  ctx.strokeStyle = '#bbb'
  ctx.beginPath()
  ctx.arc(center[0], center[1], radius - (band * 2.5), startArc, endArc)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(center[0], center[1], radius - (band * 4.5), startArc, endArc)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(center[0], center[1], radius - (band * 6.5), startArc, endArc)
  ctx.stroke()
  ctx.fillStyle = '#bbb'
  nub = radius - (band * 8)
  ctx.beginPath()
  ctx.arc(center[0], center[1], nub, startArc, endArc)
  ctx.lineTo(center[0], center[1])
  ctx.closePath()
  ctx.fill()
  canvas.toBlob((blob) ->
    url = URL.createObjectURL(blob)
    image = document.querySelector('#qr img')
    image.onload = ->
      this.setAttribute('height', this.naturalHeight)
      this.setAttribute('width', this.naturalWidth)
    image.src = url
  )

document.addEventListener('DOMContentLoaded', ->
  document.querySelector('form#wifi').addEventListener('submit', (e) ->
    e.preventDefault()
    e.stopPropagation()
    # https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
    ssid     = this['ssid'].value
    password = this['password'].value
    text = "WIFI:T:WPA;S:#{ssid};P:#{password};;"
    generate(text)
  )
)