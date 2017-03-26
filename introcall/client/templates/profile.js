Template.profile.onCreated(function() {
    this.autorun(() => {
        this.subscribe('user.private');
    })
});



Template.profile.helpers({
    formData: function() {
        return UserProfile.findOne({
            userId: Meteor.userId()
        })
    },
    currentUser: function() {
        return Meteor.user();
    },
});

Template.profile.events({
    'submit form': function(event) {
        event.preventDefault();
        var profile = {}

        profile.name = $('[name=name]').val();
        profile.email = $('[name=email]').val();
        profile.currentLocation = $('[name=currentLocation]').val();
        timezone = $('[name=timezone]').val();
        //profile.timezone = new
        profile.phoneNumber = $('[name=phoneNumber]').val();

        Meteor.call('user.updateProfile', profile, function(err, result) {
            if (err) {
                alert(err);
            } else {
                alert('profile updated!');
            }
        });
        //Meteor update
    }

});
