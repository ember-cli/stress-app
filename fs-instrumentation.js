var fs = require('fs');

var calls = Object.create(null);

for (var member in fs) {
  var old = fs[member];
  if (typeof old === 'function') {
    fs[member] = (function(old, member) {
      return function() {
        calls[member].calls++;
        return old.apply(fs, arguments);
      };
    }(old, member));

    calls[member] = {
      calls: 0,
      stack: [],
    };
  }
}

function printSorted() {
  fs.writeFileSync('foo', JSON.stringify(Object.keys(calls).map(function(a) {
    return { calls: calls[a], method: a };
  }).sort(function(a,b) {
    return b.calls - a.calls;
  })));
  Object.keys(calls).forEach(function(a) {
    calls[a] = 0;
    calls[a].stack = [];

  });
}

process.on('exit', function(code) {
 printSorted();
});
//process.on('SIGHUP', function(code) {
// printSorted();
//});
