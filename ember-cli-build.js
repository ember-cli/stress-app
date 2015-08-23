/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
require('./fs-instrumentation');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-jquery-ui': {
      theme: 'ui-darkness'
    },

    sourcemaps: {
      enabled: false,
      sourceMap: false
    },
    autoprefixer: {
      browsers: [
        'last 1 version',
        'IE >= 10',
        'Safari >= 7'
      ]
    }
  });

  process.on('exit', function(code) {
    console.log('legacyFilesToAppend', app.legacyFilesToAppend.length);
    console.log('legacyTestFilesToAppend', app.legacyTestFilesToAppend.length);
    console.log('vendorStaticStyles', app.vendorStaticStyles.length);
    console.log('vendorTestStaticStyles', app.vendorTestStaticStyles.length);
    console.log('otherAssetPaths', app.legacyTestFilesToAppend.length);
  });

  //import material design lite
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

  app.import('bower_components/ember-oauth2/dist/ember-oauth2.amd.js', {
    exports: {
      'ember-oauth2': [
        'default'
      ]
    }
  });
  app.import('bower_components/zeroclipboard/dist/ZeroClipboard.js');
  app.import('bower_components/zeroclipboard/dist/ZeroClipboard.swf', { destDir: 'assets' });
  app.import('bower_components/date.format/date.format.js');
  app.import('bower_components/momentjs/moment.js');
  app.import('bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js');
  app.import('bower_components/eventEmitter/EventEmitter.js');
  app.import('bower_components/eventie/eventie.js');
  app.import('bower_components/imagesloaded/imagesloaded.js');
  app.import('bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js');
  app.import('bower_components/jquery-file-upload/js/jquery.fileupload.js');
  app.import('bower_components/pusher/dist/pusher.min.js');
  app.import('bower_components/jquery-scrollparent/jquery.scrollparent.js');
  app.import('bower_components/highcharts-release/highcharts.js');
  app.import('bower_components/nouislider/distribute/jquery.nouislider.all.js');
  app.import('bower_components/jquery-visible/jquery.visible.js');
  app.import('bower_components/lodash/lodash.js');
  app.import('bower_components/triejs/src/trie.min.js');
  app.import('bower_components/blueimp-load-image/js/load-image.js');
  app.import('bower_components/blueimp-load-image/js/load-image-meta.js');
  app.import('bower_components/blueimp-load-image/js/load-image-exif.js');
  app.import('bower_components/blueimp-load-image/js/load-image-orientation.js');
  app.import('bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js');
  app.import('bower_components/sortable.js/Sortable.js');

  //========= TEST ASSETS
  if(app.env === 'test') {
    app.import('bower_components/sinonjs/sinon.js');
  }

  return app.toTree();
};
