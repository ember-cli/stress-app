# Stress-app

This app aims to be a stress test for ember-cli.
We will contiue to add scenarios that make it slow, then make it fast again



[issues](https://github.com/ember-cli/stress-app/issues/) are going to track known issues with this app
[ember-cli/issues](https://github.com/ember-cli/ember-cli/issues?q=is%3Aopen+is%3Aissue+label%3Aperformance) is meant for perf issues that in ember-cli but are likely described by a scenario here.

## Current state:

This app really doesn't contain many app or test files yet, rather is mostly focused on a specific issues:

* many app.imports (lets get the number)
* very large bower_components dir (80,000k+ files – we hit a pathalogical scenario here that is now largely fixed)
* ... (lets keep this up to date)

[We clearly need more files](https://github.com/ember-cli/stress-app/issues/2) to really start to represent real apps.

## Progress so far

from ember 1.13.0 -> 1.13.8, we went from initial builds of:

```
Build successful - 15798ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SourcemapConcat                               | 2449ms
SourcemapConcat                               | 2211ms
SourcemapConcat                               | 2206ms
SourcemapConcat                               | 2186ms
SassCompiler                                  | 2157ms
Funnel: App JS Files                          | 1627ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SourcemapConcat (8)                           | 9189ms (1148 ms)
SassCompiler (1)                              | 2157ms
Babel (12)                                    | 1749ms (145 ms)
Funnel: App JS Files (1)                      | 1627ms

```

and incremental builds of:

```

Build successful - 12759ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SourcemapConcat                               | 2474ms
SourcemapConcat                               | 2438ms
SourcemapConcat                               | 2274ms
SassCompiler                                  | 2047ms
SourcemapConcat                               | 1874ms
Funnel: App JS Files                          | 1018ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SourcemapConcat (8)                           | 9140ms (1142 ms)
SassCompiler (1)                              | 2047ms
Funnel: App JS Files (1)                      | 1018ms


```


to 1.13.8 initial builds of:

```
Build successful - 6368ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 3089ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 3089ms
Babel (12)                                    | 1632ms (136 ms)

```

and incremental builds of:

```

Build successful - 2307ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1544ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1544ms
Funnel (118)                                  | 155ms (1 ms)
```

and on master (9b695718b)

initial of:
```
Build successful - 4630ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1938ms
Babel                                         | 255ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1938ms
Babel (12)                                    | 1519ms (126 ms)

```

and incremental of:

```
Build successful - 2186ms.

Slowest Trees                                 | Total
----------------------------------------------+---------------------
SassCompiler                                  | 1529ms

Slowest Trees (cumulative)                    | Total (avg)
----------------------------------------------+---------------------
SassCompiler (1)                              | 1529ms
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

