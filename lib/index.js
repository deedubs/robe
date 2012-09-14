var debug = require('debug')('robe')
  , monkManager = require('monk')
  , monk;

function Robe (collectionName) {
  this.collection = monk.get(collectionName);
}

Robe.prototype.all = function (options, callback) {
  if(typeof(options) === 'function') {
    callback = options;
    options = {};
  }

  this.collection.find({}, callback);
}

Robe.prototype.find = function(query, callback) {
  this.collection.find(query, callback);
}

Robe.prototype.findOne = function(query, callback) {
  this.collection.findOne(query, callback);
}

Robe.prototype.insert = function(attrs, callback) {
  this.collection.insert(attrs, callback);
}

Robe.prototype.save = Robe.prototype.insert;

Robe.prototype.byId = function (id, callback) {
  if (!id) {
    return callback(new Error('Id must be supplied'));
  }

  this.collection.findById(id, callback);
}

module.exports = function (mongoUrlString) {
  monk = monkManager(mongoUrlString);

  return Robe;
}