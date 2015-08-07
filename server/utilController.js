
module.exports = {

  // takes in a JSON listing of a single congress person, returns a shortened object like:
  /* { id: 400408,
     firstName: 'Patrick',
     lastName: 'Toomey',
     title: 'Sen. Patrick “Pat” Toomey [R-PA]' } */
  makeMemberEntry: function(listing) {
    return {
      id: listing.person.id,
      firstName: listing.person.firstname,
      lastName: listing.person.lastname,
      title: listing.person.name
    };
  },

  // takes in a JSON listing of a listing from govTrack Person API call
  // returns a shortened object like:
  /*  
      id
      name
      description
      party
      birthday
      enddate
      twitterid
      youtubeid
      website
      phone
  */
  makeMemberProfile: function(listing) {
    return {
      id: listing.id,
      name: listing.name,
      description: listing.roles.description,
      party: listing.roles.party,
      birthday: listing.birthday,
      enddate: listing.roles.enddate,
      twitterid: listing.twitterid,
      youtubeid: listing.youtubeid,
      website: listing.roles.website,
      phone: listing.roles.phone
    };
  }

};