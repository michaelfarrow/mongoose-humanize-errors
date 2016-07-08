
var messages = {
  required: '{PATH} is required.',
  min: '{PATH} below minimum.',
  max: '{PATH} above maximum.',
  enum: '{PATH} not an allowed value.',
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
        if(!Array.isArray(doc.schema.tree[field][error.properties.type])){
          // If we have a message for `type`, just push the error through
          if (messages.hasOwnProperty(properties.type)){
            var messageFormat = messages[properties.type];
            properties.message = messageFormat;
            error.message = error.formatMessage(messageFormat, properties);
          }
        }
      });
    }

  });
}
