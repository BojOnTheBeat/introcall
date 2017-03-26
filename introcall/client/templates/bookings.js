Template.bookings.events({
    'click .setdef': function(event){
        Meteor.call('user.updateProfile', {timekitDefaultCal: event.target.id}, false, function(err, result){
            if(err) alert(err);
        })
    }
})
