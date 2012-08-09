var monk;

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

Robe.prototype.byId = function (id, options, callback) {
  if (!id) {
    return callback(new Error('Id must be supplied'));
  }

  if(typeof(options) === 'function') {
    callback = options;
    options = {};
  }

  this.collection.findById({}, callback);
}

module.exports = function (mongoUrlString) {
  monk = require('monk')(mongoUrlString)
  return Robe;
}