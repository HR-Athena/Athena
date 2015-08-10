var chai = require('chai');
var expect = chai.expect;

describe('something, anything', function() {

  it("can run a test", function(){
    console.log('I am running');
    expect(2 + 2).to.equal(4);
  });

});
