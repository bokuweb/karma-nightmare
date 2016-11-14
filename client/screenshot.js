const nightmare = window.__nightmare || parent.window.__nightmare;

module.exports = function screenshot(path, cb) {
  if (!nightmare) return;
  nightmare.capture({ path: path });
  nightmare.ipc.once('reply', cb);
}
