const PluginError = require('plugin-error');
const through = require('through2');
const crass = require('crass');
/**
 * Creates a PluginError with the provided message
 *
 * @param {string} details Contains further details regarding the issue
 * @return {PluginError}
 */
const withError = details => new PluginError('gulp-crass-minifier', details);

module.exports = (options = {
    optimize: true,
    pretty: false,
    css4: false,
    o1: true,
    saveie: false,
    browser_min: {
        chrome: 39,
        firefox: 31,
        ie: 11,
        opera: 26,
    }
}) => through.obj(function (file, encoding, done) {

    // Ignore empty files
    if (file === null) return done(null, file);

    // Streams are not supported. Suggest to use gulp-buffer or vinyl-buffer.
    if (file.isStream()) {
        return done(withError('Streaming is not supported. You might want to use gulp-buffer or vinyl-buffer to get around this issue.'));
    }

    // TODO: Merge default configuration object and supplied configuration object to apply defaults to missing fields

    // Minify CSS using Crass
    try {
        const parsedCode = crass.parse(file.contents.toString());
        if (options.optimize) {
            if (options.pretty) {
                file.contents = new Buffer.from(parsedCode.optimize(options).pretty());
            } else {
                file.contents = new Buffer.from(parsedCode.optimize(options).toString());
            }
        } else if (options.pretty) {
            file.contents = new Buffer.from(parsedCode.pretty());
        }
        return done(null, file);
    } catch (error) {
        return done(withError(error));
    }
});