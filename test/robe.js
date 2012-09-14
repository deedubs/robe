var Robe = require('../')(config.db);

describe('Robe', function() {
  describe('Factory', function () {
    before(function () {
      this.robe = new Robe('TestModel');
    });

    it('should have a .all function', function() {
      expect(this.robe.all).to.be.a('function');
    });

    it('should have a .find function', function() {
      expect(this.robe.find).to.be.a('function');
    });

    it('should have a .findOne function', function() {
      expect(this.robe.findOne).to.be.a('function');
    });

    it('should have a .insert function', function() {
      expect(this.robe.insert).to.be.a('function');
    });

    it('should have a .byId function', function() {
      expect(this.robe.byId).to.be.a('function');
    });

    it('should have a .save function', function() {
      expect(this.robe.save).to.be.a('function');
    });
  });
});