# gulp-crass-minifier
`gulp-crass-minifier` is [Gulp](https://gulpjs.com) plugin to minify CSS files using [Crass](https://github.com/mattbasta/crass/) library.

## How to install
```
npm install --save-dev gulp-crass-minifier
```

> :warning: **SECURITY WARNING** :warning:
>
> Due to known [vulnerability](https://github.com/mattbasta/crass/issues/77) in Crass library you shouldn't use `gulp-crass-minifier` nor `crass` on production! Make sure to minify your files on development environment and not on production. Please note that already **minified files pose no threat** and can be safely placed in production without any worries.

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
`gulp-crass-minifier` uses the same configuration structure as Crass:

Option | Type | Default value | Description
--- | --- | --- | ---
optimize | boolean | `true` | Enables actual minification. You might want to disable it if you only care about pretty output or you simply don't want to minify the code just yet.
o1 | boolean | `true` | Enables more advanced optimizations at cost of longer minification time. According to Crass README page, these optimizations are not guaranteed to work for all CSS, so you should disable it if you encounter any issues.
pretty | boolean | `false` | Enable this flag to generate pretty human-readable syntax for your CSS. If used alongside minification your CSS will still get minified but output will be prettified.
css4 | boolean | `false` | Enable this flag to allow for optimization that involves CSS4 features and syntax. None of major browsers fully support CSS4 yet, so you most likely don't want to use this feature unless you explicitly want CSS4 output.
saveie | boolean | `false` | Enables features dedicated to support Internet Explorer 6 and below. There should be literally no reason to enable this flag unless you're a time traveler.
browser_min | object | _Same as below_ | Using those options you will instruct Crass to strip CSS that would otherwise only apply to browsers older than the versions listed.<br><br>For example, `{ browser_min.ie: 9, browser_min.firefox: 30 }` would strip CSS that applies only to Firefox 29 and below and Internet Explorer 8 and below. As for now, only Internet Explorer, Opera, Firefox and Chrome are supported.
browser_min.chrome | number | `39` | Lowest supported version of Google Chrome
browser_min.firefox | number | `31` | Lowest supported version of Firefox
browser_min.opera | number | `26` | Lowest supported version of Opera
browser_min.ie | number | `11` | Lowest supported version of Internet Explorer

## Plugin TODO List
This section contains list of things that should be implemented or changed in `gulp-crass-minifier` itself. I will most likely do some of those things on my own eventually when I get some time. However, if you want to help out and contribute towards this plugin,  feel free to pick up something from the list below!
 * Create some tests to make sure everything works properly whenever there is an update;

## Frequent Questions

### Why Crass? What makes it better from other minifiers?
Unlike vast majority of other minifiers, Crass parses full CSS tree allowing it to perform all kind of optimizations that wouldn't be otherwise possible on string source based minifiers. This approach causes Crass to be the slowest but yet the most effective in most situations, which is further evidenced in [goalsmashers' css minification benchmark](https://goalsmashers.github.io/css-minification-benchmark/).

### Isn't Crass outdated and not maintained anymore?
That's actually a hard question. Last commit in Crass repository comes from July 2019 and the last actual change in the library was back in February 2018 so it might feel a little abandoned. However, to this day Crass remains one of if not the most effective CSS minifier available in NPM repository and could be easily be claimed as feature-complete.

Note that Crass is published on MIT license, meaning that you can fork the project at any time and take initiative in its development at any point in time. Just don't forget to let me know as I would love to gulpify your fork as well ;-)

### Using Crass is slowing down my development forcing me to wait!
If (somehow) you find yourself in a situation where Crass minification time reduces your programming performance, it is advised to turn off minification (`optimize: false`) during development and use it on-demand, for example while creating production build.

That being said, unless you operate on huge CSS files or use very low end computer for development, you shouldn't really notice any delays in your workflow. 

### What is the difference between `gulp-crass-minifier` and `gulp-crass`?
`gulp-crass` was created by another person that apparently doesn't maintain it anymore since not a single commit was made since 2017. `gulp-crass-minifier` is my own wrapper written "from scratch" and actively maintained since 2020.

On top of that, `gulp-crass-minifier` has few more advantages:
 * Detailed README alongside useful examples that will leave no doubt about plugin usage.
 * Dependency declarations that won't cause sudden break. (`gulp-crass` is using wildcard for **any** available version of `crass`, meaning it can just simply stop working if crass releases non-backwards-compatible version)

### NPM is telling me about some kind of vulnerability! Help?!
Sadly this vulnerability notification comes from outdated `svgo` package that `crass` is still using. I am unable to fix that issue at `gulp-crass-minifier` level, however [I already did report this issue](https://github.com/mattbasta/crass/issues/77) to Crass maintainers. That being said, you should be totally fine as long as you don't place neither `gulp-crass-minifier` nor `crass` on production server-side.

If safety is your concern, you should simply use this library to minify your CSS files within development environment and then move minified files to production server. Vulnerability has no affect on minified files, meaning that placing minified files on your public server poses no safety threat. 

### I've found a bug / improvement for Crass! 
That's great! However, this repository is nothing more than a simple gulp wrapper for crass. If you want to report an issue or suggest a new feature, you should do so in [the official Crass repository](https://github.com/mattbasta/crass).

### ...but my bug is related just to Gulp plugin
If you're sure that your issue is cased directly by my gulp plugin rather than Crass library, feel free to open a new GitHub Issue and I'll do my best to solve that problem as soon as possible!

## Authors
* [Matt Basta](http://mattbasta.com/) - Creator of `crass` library itself.
* [Dawid Niedźwiedzki](https://dawid.niedzwiedzki.tech/) - Creator of `gulp-crass-minifier` wrapper.

If you ever decide to contribute to `gulp-crass-minifier`, feel free to add yourself in here!

