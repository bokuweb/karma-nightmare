module.exports = {
  screenshot: function (path) {
    return new Promise(function (resolve, reject) {
      const nightmare = typeof window !== 'undefined' &&
            window.__nightmare ||
            parent.window.__nightmare;
      const fs = nightmare.fs;
      if (!nightmare) return;
      const win = nightmare.remote.getCurrentWindow();
      setTimeout(function() {
        win.capturePage(function(img) {
          const png = img.toDataURL();
          const data = png.split(',')[1];
          nightmare.mkdirp(nightmare.path.dirname(path), function (err) {
            if (err) reject(err);
            fs.writeFile(path, data, 'base64', resolve);
          });
        });
      }, 100);
    });
  }
}

