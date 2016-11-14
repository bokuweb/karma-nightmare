const screenshot = require('../client/screenshot');

describe('nightmare', function () {
  it('one plus one equals two', function (done) {
    document.querySelector('body').innerText = 'test';
    screenshot('./test.png', function() { done() });
  })
});

