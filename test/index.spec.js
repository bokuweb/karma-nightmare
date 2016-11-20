const { screenshot } = require('../client');

describe('nightmare', function () {
  it('one plus one equals two', function (done) {
    document.querySelector('body').innerText = 'test';
    screenshot('./test.png').then(done);
  })
});

