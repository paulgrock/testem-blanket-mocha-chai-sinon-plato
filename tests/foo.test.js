define([
  'jquery',
  'foo'
], function ($, foo) {
  describe('.foo', function(){
    describe('#init', function() {
      it('returns foobar', function(){
        expect(foo.init('foo', 'bar')).to.equal('foobar');
      });
    });
    describe('#fetch', function() {
      describe('success', function() {
        before(function(){
          sinon.stub($, 'ajax').returns(function () {
            var d = $.Deferred();
            d.resolve({
              name: 'Paul'
            });
            return d.promise();
          });
        });
        it('returns a successful promise', function(done){
          foo.fetch()().then(function(){
            expect(foo.fetch()().then).to.be.a.function;
            done();
          });
        });


        it('returns a listEL with name in it', function(done){
          var req = foo.fetch();
          req().then(function(data){
            var html = foo.render(data);
            expect(html).to.equal('<li>Paul</li>')
            done();
          });
        });
        after(function(){
          $.ajax.restore();
        });
      })
      describe('fail', function() {
        before(function(){
          sinon.stub($, 'ajax').returns(function () {
            var d = $.Deferred();
            d.reject({}, {}, {
              error: 'not found'
            });
            return d.promise();
          });
        });

        it('will fail miserably', function(done){
          var req = foo.fetch();
          req().fail(function(xhr, status, error){
            var fail = foo.error(error);
            expect(fail).to.equal('not found');
            done();
          });
        });

        after(function(){
          $.ajax.restore();
        });

      });
    });
  });

});
