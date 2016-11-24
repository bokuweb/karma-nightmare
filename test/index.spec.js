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
  })

  it('should expected property registered to window.__nightmare', () => {
    const testProperty = typeof window === 'undefined' &&
          window.__nightmare.testProperty ||
          window.parent.__nightmare.testProperty;
    assert.equal(testProperty, 'testProperty');
  })
});

