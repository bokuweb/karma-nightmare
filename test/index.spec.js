const { screenshot } = require('karma-nightmare');
const { assert } = require('chai');

describe('karma-nightmare spec', () => {
  it('should capture browser screenshot', (done) => {
    document.querySelector('body').innerText = 'karma-nightmare spec';
    screenshot('./screenshot.png')
      .then(() => {
        const fs = typeof window === 'undefined' &&
              window.__nightmare.fs ||
              window.parent.__nightmare.fs;
        fs.readFileSync('./screenshot.png');
        done();
      })
      .catch(() => { throw new Error('rejected') });
  });

  it('should expected property registered to window.__nightmare/window.parent.__nightmare', () => {
    const test = typeof window === 'undefined' &&
          window.__nightmare.test ||
          window.parent.__nightmare.test;
    assert.equal(test, 'test');
  });

  it('should be able to use require with nodeIntegration = true', () => {
    const require = typeof window === 'undefined' &&
          window.require ||
          window.parent.require;
    assert(!!require('fs'));
  })

  it('should be able to read test.txt with fs module', () => {
    const require = typeof window === 'undefined' &&
          window.require ||
          window.parent.require;
    assert.equal(require('fs').readFileSync('./test/test.txt', 'utf8'), 'text for test\n');
  })
});

