const { screenshot } = require('karma-nightmare');

describe('karma-nightmare spec', () => {
  it('should capture browser screenshot', (done) => {
    document.querySelector('body').innerText = 'karma-nightmare spec';
    screenshot('./screenshot.png')
      .then(() => {
        const fs = typeof window === 'undefined'
              && window.__nightmare.fs
              || window.parent.__nightmare.fs;
        fs.readFileSync('./screenshot.png');
        done();
      })
      .catch(() => { throw new Error('rejected') });
  })
});

