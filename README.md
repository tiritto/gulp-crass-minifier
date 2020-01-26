# gulp-crass-minifier

## How to install
```
npm install --save-dev gulp-crass
```

## Examples

#### Default use
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
           optimize: false
        }))
        .pipe(gulp.dest('build/'));;
});
```

## Configuration
`gulp-crass-minifier` uses the same configuration as crass:

#### Default values

## Current TODO's
 * Merge default configuration object and supplied configuration object to apply defaults to missing fields.
 * Create some tests.
 * Write configuration explanation

## Frequent Questions

#### What is the difference between `gulp-crass-minifier` and `gulp-crass`?
`gulp-crass` was created by another person that apparently doesn't maintain it anymore since not a single commit was made since 2017. `gulp-crass-minifier` is my own wrapper written "from scratch" and actively maintained since 2020.

On top of that, `gulp-crass-minifier` has few more advantages:
 * Detailed README alongside useful examples that will leave no doubt about plugin usage.
 * Dependency declarations that won't cause sudden break. (`gulp-crass` is using wildcard for **any** available version of `crass`, meaning it can just simply stop working at some point)

#### NPM is telling me about some kind of vulnerability! Help?!
Sadly this vulnerability notification comes from outdated `svgo` package that `crass` is still using. I am unable to fix that issue at `gulp-crass-minifier` level, however [I already did report this issue](https://github.com/mattbasta/crass/issues/77) to Crass maintainers. That being said, you should be totally fine as long as you don't place neither `gulp-crass-minifier` nor `crass` on production server-side.

If safety is your concern, you should simply use this library to minify your CSS files within development environment and then move minified files to production server. Vulnerability has no affect on minified files, meaning that placing minified files on your public server poses no safety threat. 

#### I've found a bug / improvement for Crass! 
That's great! However, this repository is nothing more than a simple gulp wrapper for crass. If you want to report an issue or suggest a new feature, you should do so in [the official Crass repository](https://github.com/mattbasta/crass).

#### ...but my bug is related just to Gulp plugin
If you're sure that your issue is cased directly by my gulp plugin rather than Crass library, feel free to open a new GitHub Issue and I'll do my best to solve that problem as soon as possible!