generate = (text) ->
  # use higest error correction, so we can embed wifi icon
  matrix = QR(text, 'H')
  scale = 6
  size = matrix.length * scale
  canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  # draw qr code
  matrix.forEach((row, y) ->
    row.forEach((value, x) ->
      if value
        ctx.fillRect(x*scale, y*scale, scale, scale)
    )
  )
  #          wifi icon
  # draw white background
  radius = size / 2.5
  band   = radius / 9
  center = [size / 2, ((size - radius) / 2) + (radius) - band]
  # arc from x axis
  startArc = -Math.PI / 4 * 3# -135 deg
  endArc = -Math.PI / 4# -45 def
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'white'
  ctx.lineWidth = band * 2
  ctx.beginPath()
  ctx.arc(center[0], center[1], radius - (band * 2), startArc, endArc)
  ctx.lineTo(center[0], center[1])
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  # draw arcs
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
  # draw last nub
  nub = radius - (band * 8)
  ctx.beginPath()
  ctx.arc(center[0], center[1], nub, startArc, endArc)
  ctx.lineTo(center[0], center[1])
  ctx.closePath()
  ctx.fill()
  # convert png
  canvas.toBlob((blob) ->
    url = URL.createObjectURL(blob)
    image = document.querySelector('#qr img')
    image.onload = ->
      this.setAttribute('height', this.naturalHeight)
      this.setAttribute('width', this.naturalWidth)
    image.src = url
  )

document.addEventListener('DOMContentLoaded', ->
  document.querySelector('#qr img').addEventListener('click', ->
    window.print()
  )
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