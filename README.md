# karma-nightmare ⚡

A Karma plugin. Launcher for Nightmare

[![Build Status](https://img.shields.io/travis/bokuweb/karma-nightmare.svg?style=flat-square)](https://travis-ci.org/bokuweb/karma-nightmare)
[![Version](https://img.shields.io/npm/v/karma-nightmare.svg?style=flat-square)](https://www.npmjs.com/package/karma-nightmare)
[![npm](https://img.shields.io/npm/dm/karma-nightmare.svg?style=flat-square)]()

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Extend](#extend)
- [Test](#test)
- [Contribute](#contribute)
- [License](#license)

## Installation

``` sh
$ npm i -D karma-nightmare
```

## Usage

``` javascript
// karma.conf.js
module.exports = function(config) {
  config.set({
    browsers: ['Nightmare'],

    plugins: [
      'karma-nightmare'
    ],

    // you can define custom flags
    nightmareOptions: {
      width: 800,
      height: 600,
      show: false,
    },
  })
}
```

### Browser window options

The options attribute allows you to initialize properties on the nightmare browser window.   
The available options are [documented here](https://github.com/atom/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions).

*** Attention ***   
`nodeIntegration`, `waitTimeout`, `preload` options are fixed by `karma-nightmare`. you can not change these options.

### karma-nightmare options

| name                         | Default | Description                                                                                                                     |
| :--------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| skipScreenshot               | `false` | If set `true`, `screenshot` API is ignored.                                                                                     |
| skipCaptureHtml                         |    false |     If set `true`, `saveHtml` API is ignored.                                                                                                                                    |

Please, see also [karma.conf.js](https://github.com/bokuweb/karma-nightmare/blob/master/karma.conf.js) of this project, using `mocha` and `browserify`.

## API

### isNightmare(): boolean

Return `true`, when test is running on nightmare.

### screenshot(path: string): Promise\<void\>

Takes a screenshot of the current test. Useful for view test. The output is always a png.
If `skipScreenshot` option is set `true`, this API is ignored.

``` js
const { screenshot } = require('karma-nightmare');

describe('karma-nightmare spec', () => {
  it('should capture browser screenshot', (done) => {
    document.querySelector('body').innerText = 'karma-nightmare spec';
    screenshot('./screenshot.png').then(done);
  })
});
```

### saveHtml(path: string, saveType?: string): Promise\<void\>

Save html of the current test. Useful for view test.

``` js
const { saveHtml } = require('karma-nightmare');

describe('karma-nightmare spec', () => {
  it('should save current html snapshot', (done) => {
    document.querySelector('body').innerText = 'karma-nightmare spec';
    saveHtml('./snapshot.html').then(done);
  })
});
```

If you want `saveType` details, see http://electron.atom.io/docs/api/web-contents/#contentssavepagefullpath-savetype-callback .

## Test

``` sh
$ npm t
```

## Contribute

PRs welcome.

## License

The MIT License (MIT)

Copyright (c) 2016 @Bokuweb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
