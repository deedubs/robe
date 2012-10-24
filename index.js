var debug = require('debug')('robe')
  , monkManager = require('monk')
  , monk;

function Robe (collectionName) {
  this.collection = monk.get(collectionName);
}

Robe.prototype.all = function (options, callback) {
  this.collection.find.apply(this.collection, arguments);
}

Robe.prototype.find = Robe.prototype.all

Robe.prototype.findOne = function(query, callback) {
  this.collection.findOne(query, callback);
}

Robe.prototype.save = function (attrs, callback) {
  var robe = this;

  if(attrs._id) {
    var id = attrs._id;
    delete attrs._id;

    this.collection.updateById(id, attrs, function(err, model) {
      attrs._id = id;
      callback.apply(robe, arguments);
    });
  } else {
    this.collection.insert(attrs, callback);
  }
}

Robe.prototype.insert = Robe.prototype.save;

Robe.prototype.remove = function (object, callback) {
  this.collection.remove({_id: object._id}, callback);
}

Robe.prototype.byId = function (id, callback) {
  if (!id) {
    return callback(new Error('Id must be supplied'));
  }

  this.collection.findById(id, callback);
}

Robe.prototype.toJSON = function(attrs) {
  if(typeof(attrs) == 'function') {
    var wrappedFunction = attrs
      , klass = this;

    return function(err, model) {
      wrappedFunction(err, model && klass.toJSON(model));
    };
  }

  if (attrs) {
    Object.keys(attrs).forEach(function(key) {
      if (key.match(/^__/)) {
        attrs[key] = true;
      }
    });
  }

  return attrs;
}



module.exports = function (mongoUrlString) {
  monk = monkManager(mongoUrlString);

  return Robe;
}
