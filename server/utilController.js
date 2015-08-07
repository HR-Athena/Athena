
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
  },

  // takes in a JSON listing of a listing from govTrack Vote API, returns like:
  /*  {
        question: 'Cloture on S. 1881: A bill to prohibit Federal funding of Planned Parenthood Federation of America.',
        thomas_link: undefined,
        current_status: undefined,
        question_details: 'On Cloture on the Motion to Proceed in the Senate',
        total_minus: 46,
        total_other: 1,
        total_plus: 53,
        created: '2015-08-03T17:36:00',
        margin: 0.0707071,
        vote_type: 'On the Cloture Motion'
      }
  */
  makeBillInfo: function(listing) {
    return {
      question: listing.question,
      thomas_link: listing.thomas_link,
      current_status: listing.current_status,
      question_details: listing.question_details,
      total_minus: listing.total_minus,
      total_other: listing.total_other,
      total_plus: listing.total_plus,
      created: listing.created,
      margin: listing.margin,
      vote_type: listing.vote_type
    };
  }

};