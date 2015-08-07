
module.exports = {

  // takes in a JSON listing of a single congress person, returns a shortened object like:
  /*  { 
        id: 400408,
        firstName: 'Patrick',
        lastName: 'Toomey',
        title: 'Sen. Patrick “Pat” Toomey [R-PA]' 
      } 
  */
  makeMemberEntry: function(listing) {
    return {
      id: listing.person.id,
      firstName: listing.person.firstname,
      lastName: listing.person.lastname,
      title: listing.person.name
    };
  },

  // takes in a JSON listing of a listing from govTrack Person API, returns like:
  /*  { 
        id: 412669,
        name: 'Sen. Mike Rounds [R-SD]',
        description: 'Junior Senator from South Dakota',
        party: 'Republican',
        birthday: '1954-10-24',
        enddate: '2021-01-03',
        twitterid: 'SenatorRounds',
        youtubeid: null,
        website: 'http://www.rounds.senate.gov',
        phone: '202-224-5842' 
      }
  */
  makeMemberProfile: function(listing) {
    return {
      id: listing.id,
      name: listing.name,
      description: listing.roles[0].description,
      party: listing.roles[0].party,
      birthday: listing.birthday,
      enddate: listing.roles[0].enddate,
      twitterid: listing.twitterid,
      youtubeid: listing.youtubeid,
      website: listing.roles[0].website,
      phone: listing.roles[0].phone
    };
  }

};