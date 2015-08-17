var members = require('../../server/memberController');
var govTrack = require('govtrack-node');
var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

describe("Members controller", function() {

  describe("getAllMembers function", function() {
    var query;

    beforeEach(function(){
      query = {
        current: true, 
        limit: 600, 
        fields: 'person__id,person__firstname,person__lastname,person__name,role_type' 
      };
    });

    it("calls the findRoleAsync function of the govTrack module passing the correct query", function(done){
      /* govTrack.findRoleAsync is an asynchronous function,
         which, after promisification in memberController, returns a promise */
      sinon.stub(govTrack, 'findRoleAsync', function(){
        return Promise.resolve("foo");
      });
      members.getAllMembers();
      expect(govTrack.findRoleAsync).to.have.been.calledOnce;
      expect(govTrack.findRoleAsync).to.have.been.calledWith(query);
      done();
    });

  });

  describe("getMember function", function() {

    it("calls the findPersonAsync function of the govTrack module and passes congressman's id to it", function(done){
      /* govTrack.findPersonAsync is an asynchronous function,
         which, after promisification in memberController, returns a promise */
      sinon.stub(govTrack, 'findPersonAsync', function(){
        return Promise.resolve("foo");
      });
      members.getMember(1);
      expect(govTrack.findPersonAsync).to.have.been.calledOnce;
      expect(govTrack.findPersonAsync).to.have.been.calledWith({id: 1});
      done();
    });

  });

  describe("getMemberVotes function", function() {
    
    it("calls the findVoteVoterAsync function of the govTrack module and passes correct params to it", function(done){
      /* govTrack.findVoteVoterAsync is an asynchronous function,
         which, after promisification in memberController, returns a promise */
      sinon.stub(govTrack, 'findVoteVoterAsync', function(){
        return Promise.resolve("foo");
      });
      members.getMemberVotes(1);
      expect(govTrack.findVoteVoterAsync).to.have.been.calledOnce;
      expect(govTrack.findVoteVoterAsync).to.have.been.calledWith({
        person: 1,
        sort: '-created',
        limit: 600
      });
      done();
    });

  });

});
