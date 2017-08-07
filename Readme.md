
# mongoose-humanize-errors

Plugin for Mongoose to humanize errors into readable format.

## Index

<!-- START doctoc -->
<!-- END doctoc -->


## Install

```bash
npm install --save mongoose-humanize-errors
```


## Usage

```js
const mongooseHumanizeErrors = require('mongoose-humanize-errors');

const schema = mongoose.Schema({
  // ...
});

schema.plugin(mongooseHumanizeErrors);
```


## Options

You can optionally pass an `options` object as the second argument to `schema.plugin` above.

Default values for the options object are specified below:

```js
schema.plugin(mongooseHumanizeErrors, {
  // these are the default values:
  messages: {
    required: '{PATH} is required',
    min: '{PATH} below minimum',
    max: '{PATH} above maximum',
    enum: '{PATH} not an allowed value',
    unique: '{PATH} not a unique value',
    'Duplicate value': '{PATH} not a unique value'
  }
});
```

## Pro Tips

### Humanize Paths

You may also want to manually modify the error messages to be even more readable.

To do so, you'll most likely want to modify the path string in the error messages with [underscore.string's humanize() function][humanize].

For example, in Express you can craft an error handler to transform the messages:

```bash
npm install --save underscore.string
```

```js
const s = require('underscore.string');

app.use(function(err, req, res, next) {
  if (err && err.name && err.name === 'ValidationError')
    err.message = _.map(err.errors, error => {
      // replace `error.path` with `humanize` version
      if (_.isString(error.path))
        error.message = error.message.replace(new RegExp(error.path, 'g'), s.humanize(error.path));
      return error.message;
    }).join(', ');
  next(err);
});
```

[humanize]: https://epeli.github.io/underscore.string/#humanize-string-gt-string
