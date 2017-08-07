
var messages = {
  required: '{PATH} is required',
  min: '{PATH} below minimum',
  max: '{PATH} above maximum',
  enum: '{PATH} not an allowed value',
  unique: '{PATH} not a unique value',
  // until PR here is merged:
  // <https://github.com/matteodelabre/mongoose-beautiful-unique-validation/pull/40>
  'Duplicate value': '{PATH} not a unique value'
};

module.exports = exports = function humanizeErrorsPlugin(schema, options) {

  if(options && options.messages)
    _.extend(messages, options.messages);

  schema.post('validate', function(doc) {
    if(doc.errors){
      Object.keys(doc.errors).forEach(function(field) {
        var error = doc.errors[field];
        var properties = error.properties;
        // If we don't have a message on the schema.
        if(!Array.isArray(doc.schema.tree[field][error.properties.kind])){
          // If we have a message for `kind`, just push the error through
          if (messages.hasOwnProperty(properties.kind)){
            var messageFormat = messages[properties.kind];
            properties.message = messageFormat;
            error.message = error.formatMessage(messageFormat, properties);
          }
        }
      });
    }

  });
}
