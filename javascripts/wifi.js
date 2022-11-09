const regex = /[\\;,":]/g

const escape = (string) => string.replace(regex, '\\$&')

// https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
export default (type, ssid, password) => {
  let escapedSSID = escape(ssid)
  let escapedPassword = escape(password)
  return `WIFI:T:${type};S:${escapedSSID};P:${escapedPassword};;`
}
