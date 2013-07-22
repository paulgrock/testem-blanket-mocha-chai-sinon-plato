define([
  'bar/bar'
], function (bar) {
  describe('bar', function() {
    it('should add two numbers', function(){
      expect(bar.launch(1, 2)).to.equal(3);
    })
  })
});
