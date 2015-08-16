var app  = require('../../server/server.js');
var members = require('../../server/memberController');
var bills = require('../../server/billController');
var utils = require('../../server/utilController');
var Bluebird = require('bluebird');
var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var request  = require('supertest');
var expect = chai.expect;
chai.use(sinonChai);


describe("Basic functionality:", function() {

  it("loads correctly", function(done){
    request(app).get('/').expect(200, done);
  });

  it("responds to requests to '/members/all' with a members object", function(done){
    request(app).get('/members/all')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.property("memberList");
        expect(res.body.memberList).to.not.equal(null);
        expect(res.body).to.have.property("trendingList");
        expect(res.body.trendingList).to.not.equal(null);
        done();
      });    
  });

  it("responds with a member object to requests to '/members/:id'", function(done){
    sinon.stub(members, 'getMember', function(id, callback){callback();});
    utils.makeMemberProfile = sinon.stub().returns({foo: 'bar'});
    utils.addMembersToTrendingList = sinon.stub();
    request(app).get('/members/1')
      .expect(200)
      .end(function(err, res){
        expect(members.getMember).to.have.been.calledOnce;
        expect(res.body).to.eql({foo: 'bar'});
        done();
      });    
  });


});
