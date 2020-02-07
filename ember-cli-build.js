'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');
require('./fs-instrumentation');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: ['node_modules/material-design-lite/src'],
      implementation: nodeSass
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

  // process.on('exit', function(code) {
  //   console.log('other stuff');
  //   console.log(' - legacyFilesToAppend', app.legacyFilesToAppend.length);
  //   console.log(' - legacyTestFilesToAppend', app.legacyTestFilesToAppend.length);
  //   console.log(' - vendorStaticStyles', app.vendorStaticStyles.length);
  //   console.log(' - vendorTestStaticStyles', app.vendorTestStaticStyles.length);
  //   console.log(' - otherAssetPaths', app.otherAssetPaths.length);
  // });

  //import material design lite
  app.import('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2',{
    destDir: 'assets/fonts'
  });
  app.import('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff',{
    destDir: 'assets/fonts'
  });
  app.import('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf',{
    destDir: 'assets/fonts'
  });
  app.import('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot',{
    destDir: 'assets/fonts'
  });

  // CodeMirror JS
  app.import('node_modules/codemirror/lib/codemirror.js', { outputFile: 'codemirror.js' });
  app.import('node_modules/codemirror/mode/htmlmixed/htmlmixed.js', {
    outputFile: 'codemirror.js',
  });
  app.import('node_modules/codemirror/mode/xml/xml.js', { outputFile: 'codemirror.js' });
  app.import('node_modules/codemirror/mode/css/css.js', { outputFile: 'codemirror.js' });
  app.import('node_modules/codemirror/mode/javascript/javascript.js', {
    outputFile: 'codemirror.js',
  });
  app.import('node_modules/codemirror/addon/lint/lint.js', {
    outputFile: 'codemirror.js',
  });
  // CodeMirror CSS
  app.import('node_modules/codemirror/lib/codemirror.css', { outputFile: 'codemirror.css' });
  app.import('node_modules/codemirror/theme/monokai.css', { outputFile: 'codemirror.css' });
  app.import('node_modules/codemirror/theme/panda-syntax.css', { outputFile: 'codemirror.css' });
  app.import('node_modules/codemirror/addon/lint/lint.css', { outputFile: 'codemirror.css' });

  return app.toTree();
};
