# gulp-crass-minifier

## How to install
```
npm install --save-dev gulp-crass
```

## Examples

#### Using default configuration
```js
gulp.task('default', () => {
  return gulp.src('./css/*.css')
        .pipe(crass())
        .pipe(gulp.dest('build/'));;
});
```

#### Using custom configuration
```js
gulp.task('default', () => {
  return gulp.src('./css/*.css')
        .pipe(crass({
           pretty: true,
           optimize: true,
           o1: false,
           css4: true,
           saveie: false,
           browser_min: {
              chrome: 42,
              firefox: 38,
              ie: 11,
           }
        }))
        .pipe(gulp.dest('build/'));;
});
```

## Configuration
`gulp-crass-minifier` uses the same configuration as crass:

Attribute | Type | Default | Meaning
--- | --- | --- | ---
optimize | boolean | `true` | Enables actual minification. You might want to disable it if you only care about parsing pretty code.
o1 | boolean | `true` | Enables more advanced optimizations at cost of longer minification time. According to Crass README page, these optimizations are not guaranteed to work for all CSS, so you should disable it if you encounter any issues.
pretty | boolean | `false` | Enable this flag to generate pretty human-readable syntax for your CSS. If used alongside minification your CSS will still get minified but output will be prettified.
css4 | boolean | `false` | Enable this flag to allow for optimization that involves CSS4 features and syntax. None of major browsers fully support CSS4 yet, so you most likely don't want to use this feature unless you explicitly want CSS4 output.
saveie | boolean | `false` | Enables features dedicated to support Internet Explorer 6 and below. There should be literally no reason to enable this flag unless you're a time traveler.
browser_min | object | as below | Hello
browser_min.chrome | number | 39 | Lowest supported version for Google Chrome
browser_min.firefox | number | 31 | Lowest supported version for Google Chrome
browser_min.opera | number | 26 | Lowest supported version for Google Chrome
browser_min.ie | number | 11 | Lowest supported version for Google Chrome

## Current TODO's
 * Merge default configuration object and supplied configuration object to apply defaults to missing fields.
 * It might be a good idea to create some tests.

## Frequent Questions

#### What is the difference between `gulp-crass-minifier` and `gulp-crass`?
`gulp-crass` was created by another person that apparently doesn't maintain it anymore since not a single commit was made since 2017. `gulp-crass-minifier` is my own wrapper written "from scratch" and actively maintained since 2020.

On top of that, `gulp-crass-minifier` has few more advantages:
 * Detailed README alongside useful examples that will leave no doubt about plugin usage.
 * Dependency declarations that won't cause sudden break. (`gulp-crass` is using wildcard for **any** available version of `crass`, meaning it can just simply stop working if crass releases non-backwards-compatible version)

#### NPM is telling me about some kind of vulnerability! Help?!
Sadly this vulnerability notification comes from outdated `svgo` package that `crass` is still using. I am unable to fix that issue at `gulp-crass-minifier` level, however [I already did report this issue](https://github.com/mattbasta/crass/issues/77) to Crass maintainers. That being said, you should be totally fine as long as you don't place neither `gulp-crass-minifier` nor `crass` on production server-side.

If safety is your concern, you should simply use this library to minify your CSS files within development environment and then move minified files to production server. Vulnerability has no affect on minified files, meaning that placing minified files on your public server poses no safety threat. 

#### I've found a bug / improvement for Crass! 
That's great! However, this repository is nothing more than a simple gulp wrapper for crass. If you want to report an issue or suggest a new feature, you should do so in [the official Crass repository](https://github.com/mattbasta/crass).

#### ...but my bug is related just to Gulp plugin
If you're sure that your issue is cased directly by my gulp plugin rather than Crass library, feel free to open a new GitHub Issue and I'll do my best to solve that problem as soon as possible!