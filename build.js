import esbuild from 'esbuild';
import ghPages from 'esbuild-plugin-ghpages-pwa';

let { plugin: githubPages, buildOptions } = ghPages({
  app: 'wifi-qr',
  description: 'QR code to join Wi-Fi network',
  cacheTag: 1,
  serve: 3015
})

try {
  await esbuild.build(Object.assign(buildOptions, {
    entryPoints: [
      'javascripts/index.js',
      'stylesheets/index.css',
      'images/icon-152.png',
      'images/icon-167.png',
      'images/icon-180.png',
      'images/icon-192.png',
      'images/icon-512.png'
    ],
    target: ['chrome78', 'safari13'],
    plugins: [
      githubPages
    ]
  }))
} catch (err) {
  console.log(err)
  process.exit(1)
}

