# WiFi QR
A small [PWA](https://developer.mozilla.org/en-US/docs/Web/Apps/Progressive) to generate QR codes to join a WiFi network.

QR generation provided by [qr-image](https://github.com/alexeyten/qr-image).

Uses [esbuild-plugin-ghpages-pwa](https://github.com/firien/esbuild-plugin-ghpages-pwa) to build docs/ folder.

## Printing

When printing the page, only the QR code will print.

---


### TODO

- [ ] [wifi escaping](https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11)

### Development

    node ./build.js
