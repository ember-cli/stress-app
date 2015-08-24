# Stress-app

This app aims to be a stress test for ember-cli.
We will contiue to add scenarios that make it slow, then make it fast again


[issues](https://github.com/ember-cli/stress-app/issues/) are going to track known issues with this app
[ember-cli/issues](https://github.com/ember-cli/ember-cli/issues?q=is%3Aopen+is%3Aissue+label%3Aperformance) is meant for perf issues that in ember-cli but are likely described by a scenario here.

## Current state:


* many app.imports (lets get the number)
* very large bower_components dir (87472k+ files – we hit a pathalogical scenario here that is now largely fixed)
* medium -> large sized app

```
cloc --skip-uniqueness {app,tests}
    2136 text files.
    2136 unique files.
       8 files ignored.

http://cloc.sourceforge.net v 1.64  T=4.05 s (526.9 files/s, 14955.1 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
Javascript                    1308          11115           1976          33679
Handlebars                     823           3209            401          10047
SASS                             2              9              3             96
HTML                             2             10              0             48
-------------------------------------------------------------------------------
SUM:                          2135          14343           2380          43870
-------------------------------------------------------------------------------
```

## Progress so far

progress so far:

* 1.13.0
  *  [initial] Build successful - 46753ms.
  *  [rebuild] Build successful - 18175ms.

* 1.13.8
  *  [initial] Build successful - 37098ms.
  *  [rebuild] Build successful - 7171ms.

This was largely the result of broccoli-caching-writer + source-map concat not being aware of each other.
BCW by default will diff all inputTrees for change, then only run if the result is different then before. As it turns out, with very large bower_component trees, most of the time is spent walking and stating the disk.

In most cases, source map concat, is provided a list of files it explicitly cares about. So passing this exact information through to BCW resulted in a pretty hefty speedup. [related ember-cli issue + discussion](https://github.com/ember-cli/ember-cli/issues/4460)

* master (August 23, 2015)
  *  [initial] Build successful - 36687ms.
  *  [rebuild] Build successful - 5384ms.

As it turns out, app.import has become more popular the expected. Rather then being used 5 or 6 times in an app. It is not uncommon to (large via addons) have hundreds of them. Originally, app.import was written in a way to work-around several issues including node-watcher being poor. Now with watchman, we can reasonably watch the whole tree. So we could literally delete the old code, remove hundreds of extra broccoli steps. And squeeze out some more performance.

* master (August 24, 2015)
  *   [initial warm] Build successful - 15090ms.
  *   [rebuild] Build successful - 6830ms.

Some filters, like babel/jshint/htmlbars are slow. If we can re-use the results from the last build, initial boot should improve. Turns out it helps quite a bit. 36,000ms -> 15,000ms on warm boots. On some apps, this can save minutes.
[on ember itself](https://github.com/emberjs/ember.js/pull/12190) it went from 51995ms -> 15967ms.

[related issue)](https://github.com/ember-cli/ember-cli/issues/4645)

....

This current state of the stress-app is pretty good respresentation of the current state of medium -> large sized apps. It doesn't yet represent some of the mega sized apps, but that is ok for now. Lets get these numbers down.

* near term target (reasonable near term)
  * [initial warm] Build successful - 10000ms. (this is for warm, cache primed builds and restarts)
  * [rebuild] Build successful - 2500ms. (not perfect, but feels like a reasonable short term goal 50% of current)

==== more indepth output

```
version: 1.13.0--6d06abacc7
Deprecation warning: sassOptions should be moved to your Brocfile
Livereload server on http://localhost:35729
Serving on http://localhost:5511/
Build successful - 46753ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
Babel                                         | 8528ms
JSHint app- QUnit                             | 6524ms
Babel                                         | 6522ms
ES6: App Tree                                 | 4577ms
SourcemapConcat                               | 2379ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
Babel (13)                                    | 16463ms (1266 ms)
SourcemapConcat (8)                           | 11020ms (1377 ms)
JSHint app- QUnit (1)                         | 6524ms
ES6: App Tree (1)                             | 4577ms

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js

Build successful - 18175ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SourcemapConcat                               | 2596ms
SourcemapConcat                               | 2281ms
SourcemapConcat                               | 2268ms
SourcemapConcat                               | 2183ms
Funnel: App JS Files                          | 2028ms
SourcemapConcat                               | 2016ms
SassCompiler                                  | 1754ms
ES6: App Tree                                 | 1028ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SourcemapConcat (8)                           | 11397ms (1424 ms)
Funnel: App JS Files (1)                      | 2028ms
SassCompiler (1)                              | 1754ms
ES6: App Tree (1)                             | 1028ms
```
---

```
➜  slow-ember-cli-project git:(master) ✗ version: 1.13.8--1121141036
Deprecation warning: sassOptions should be moved to your Brocfile
Livereload server on http://localhost:49152
Serving on http://localhost:5511/
Build successful - 37098ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
Babel                                         | 8500ms
JSHint app- QUnit                             | 6754ms
Babel                                         | 6546ms
ES6: App Tree                                 | 4058ms
SassCompiler                                  | 3326ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
Babel (13)                                    | 16496ms (1268 ms)
JSHint app- QUnit (1)                         | 6754ms
ES6: App Tree (1)                             | 4058ms
SassCompiler (1)                              | 3326ms

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js

Build successful - 7171ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 2796ms
Funnel: App JS Files                          | 1278ms
BroccoliMergeTrees                            | 812ms
Concat: App                                   | 502ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 2796ms
Funnel: App JS Files (1)                      | 1278ms
BroccoliMergeTrees (15)                       | 851ms (56 ms)
Concat: App (1)                               | 502ms
Babel (13)                                    | 366ms (28 ms)
```

----

```
ember s --port 5511 &
➜  slow-ember-cli-project git:(master) ✗ version: 1.13.8-master-a6e9e4eeaf
Deprecation warning: sassOptions should be moved to your Brocfile
Livereload server on http://localhost:49152
Serving on http://localhost:5511/

Build successful - 36687ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
Babel                                         | 8431ms
JSHint app- QUnit                             | 6835ms
Babel                                         | 6486ms
ES6: App Tree                                 | 4061ms
SassCompiler                                  | 3203ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
Babel (13)                                    | 16345ms (1257 ms)
JSHint app- QUnit (1)                         | 6835ms
ES6: App Tree (1)                             | 4061ms
SassCompiler (1)                              | 3203ms

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js

Build successful - 5384ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1415ms
Funnel: App JS Files                          | 1208ms
BroccoliMergeTrees                            | 810ms
Concat: App                                   | 407ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1415ms
Funnel: App JS Files (1)                      | 1208ms
BroccoliMergeTrees (15)                       | 845ms (56 ms)
Concat: App (1)                               | 407ms
Babel (13)                                    | 350ms (26 ms)
```

```
ember s
version: 1.13.8-broccoli-viz-0ed4b89831

Build successful - 15263ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
ES6: App Tree                                 | 4197ms
SassCompiler                                  | 2214ms
TemplateCompiler                              | 1674ms
JSHint app- QUnit                             | 1083ms
Funnel: App JS Files                          | 1054ms
Babel                                         | 1049ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
ES6: App Tree (1)                             | 4197ms
SassCompiler (1)                              | 2214ms
Babel (13)                                    | 2108ms (162 ms)
TemplateCompiler (2)                          | 1707ms (853 ms)
JSHint app- QUnit (1)                         | 1083ms
Funnel: App JS Files (1)                      | 1054ms

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js

Build successful - 5876ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
Funnel: App JS Files                          | 1633ms
SassCompiler                                  | 1572ms
BroccoliMergeTrees                            | 944ms
Concat: App                                   | 448ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
Funnel: App JS Files (1)                      | 1633ms
SassCompiler (1)                              | 1572ms
BroccoliMergeTrees (14)                       | 969ms (69 ms)
Concat: App (1)                               | 448ms
Babel (13)
```
This improvements have been mostly targeted a bower_components \w massive trees causing totally unexpected grief.

Up next:

* persistent filters to improve initial boot for 
  * jshint
  * jscs
  * babel
* alternative approach for CSS plugins (explicitly configure all input trees)
* batch mkdpr creation for broccoli-filter + broccoli-merge-trees -> https://github.com/broccolijs/broccoli-filter/pull/33
* persistentOutput refactors for broccoli-filter + broccoli-merge-trees
* ???

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

