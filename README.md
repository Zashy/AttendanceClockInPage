#Installation

Requires node.js installed. Then simply download the zip, and run the following command via command prompt in the folder
```
npm install
```

#NPM Scripts

The NPM scripts defined in the packages.json are:
* `npm run start`
..* starts webpack with hot module replacement. Connect to `http://localhost:3000/dist/index.html`
* `npm run build`
..* builds the files to `/dist/bundle.js`
* `npm run dev`
..* runs webpack in dev mode with additional console logging