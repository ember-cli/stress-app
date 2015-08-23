# Stress-app

This app aims to be a stress test for ember-cli.
We will contiue to add scenarios that make it slow, then make it fast again



[issues](https://github.com/ember-cli/stress-app/issues/) are going to track known issues with this app
[ember-cli/issues](https://github.com/ember-cli/ember-cli/issues?q=is%3Aopen+is%3Aissue+label%3Aperformance) is meant for perf issues that in ember-cli but are likely described by a scenario here.

## Current state:

This app really doesn't contain many app or test files yet, rather is mostly focused on a specific issues:

* many app.imports (lets get the number)
* very large bower_components dir (87472k+ files – we hit a pathalogical scenario here that is now largely fixed)
* ... (lets keep this up to date)

[We clearly need more files](https://github.com/ember-cli/stress-app/issues/2) to really start to represent real apps.

## Progress so far

progress so far:

* 1.13.0
  *  [initial] Build successful - 22570ms.
  *  [rebuild] Build successful - 15647ms.

* 1.13.8
  *  [initial] Build successful - 5323ms.
  *  [rebuild] Build successful - 2288ms.

* master
  *  [initial] Build successful - 5142ms.
  *  [rebuild] Build successful - 1963ms.

This current state of the stress-app (still not quite representing real apps, since we don't have many app files – just lots of deps) is still now mostly dominating be the CSS preprocessor which we will be looking at next

```
version: 1.13.0--6d06abacc7
Deprecation warning: sassOptions should be moved to your Brocfile
Livereload server on http://localhost:35729
Serving on http://localhost:5511/
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead

Build successful - 22570ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SourcemapConcat                               | 8108ms
SourcemapConcat                               | 2794ms
SourcemapConcat                               | 2524ms
SassCompiler                                  | 2253ms
SourcemapConcat                               | 2249ms
Funnel: App JS Files                          | 1338ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SourcemapConcat (8)                           | 15808ms (1976 ms)
SassCompiler (1)                              | 2253ms
Babel (12)                                    | 1785ms (148 ms)
Funnel: App JS Files (1)                      | 1338ms

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead

Build successful - 15647ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SourcemapConcat                               | 6360ms
SourcemapConcat                               | 2147ms
SourcemapConcat                               | 1904ms
SourcemapConcat                               | 1898ms
SassCompiler                                  | 1738ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SourcemapConcat (8)                           | 12378ms (1547 ms)
SassCompiler (1)                              | 1738ms
```
---

```
➜  slow-ember-cli-project git:(master) ✗ version: 1.13.8--1121141036
Deprecation warning: sassOptions should be moved to your Brocfile
Livereload server on http://localhost:49152
Serving on http://localhost:5511/
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead

Build successful - 5323ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1941ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1941ms
Babel (12)                                    | 1637ms (136 ms)

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js

Build successful - 2288ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1515ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1515ms
Funnel (142)                                  | 158ms (1 ms)
```
----

```
ember s --port 5511 &
➜  slow-ember-cli-project git:(master) ✗ version: 1.13.8-master-a6e9e4eeaf
Deprecation warning: sassOptions should be moved to your Brocfile
Livereload server on http://localhost:49152
Serving on http://localhost:5511/
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead
Autoprefixer's process() method is deprecated and will removed in next major release. Use postcss([autoprefixer]).process() instead

Build successful - 5142ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1785ms
Babel                                         | 282ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1785ms
Babel (12)                                    | 1745ms (145 ms)

➜  slow-ember-cli-project git:(master) ✗ touch app/app.js
➜  slow-ember-cli-project git:(master) ✗ file changed app.js

Build successful - 1963ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1405ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1405ms

```

This improvements are good, but really target problems related to bower_components size, not totall app/* or tests/* size

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

