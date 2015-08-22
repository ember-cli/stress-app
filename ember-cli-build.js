/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: false,
      sourceMap: false
    }
  });

  //import material design lite
  app.import('bower_components/material-design-lite-src/dist/material.js');
  app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff2',{
    destDir: 'assets/fonts'
  });
  app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.woff',{
    destDir: 'assets/fonts'
  });
  app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.ttf',{
    destDir: 'assets/fonts'
  });
  app.import('bower_components/material-design-icons/iconfont/MaterialIcons-Regular.eot',{
    destDir: 'assets/fonts'
  });

  return app.toTree();
};
