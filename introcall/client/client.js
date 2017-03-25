Router.route('/', {
    name: 'home',
    layoutTemplate: 'home',
    data: function() {

        var kfilter = {};
        if (Session.get('kfilter') && Session.get('kfilter').length) {
            kfilter = {
                keywords: {
                    $in: Session.get('kfilter')
                }
            };
        }

        return {
            keywords: Keywords.find(),
            cprofiles: UserProfile.find(kfilter)
        }
    }
});

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/register');
Router.route('/login');
Router.route('/dashboard');
Router.route('/joincall/:toid', {
    layoutTemplate: 'main',
    template: 'joincall'
});
Router.route('/profile');
Router.route('/meet/:userid', {
    layoutTemplate: 'main',
    template: 'meet',
    data: function(){
        return {
            curProfile: UserProfile.findOne({userId: Meteor.userId()}),
            otherUser: UserProfile.findOne({userId: this.params.userid})
        }
    }
});



Template.main.onCreated(function(){
    //here's where global subscriptions are setup
    this.autorun(() => {
        this.subscribe('users.public');
    })
});




Template.home.onCreated(function() {
    Meteor.setTimeout(function() {
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    }, 500);
    this.autorun(() => {
        this.subscribe('users.public');
        this.subscribe('keywords.public');
    })
});

Template.register.events({
    'submit form': function(e) {
        e.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        //Meteor magic
        Accounts.createUser({
            email: email,
            password: password
        }, function(error) {
            if (error) {
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("home"); // Redirect user if registration succeeds
            }
        });

    },
});

Template.navigation.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.navigation.onRendered(function() {
    Meteor.setTimeout(function() {
        $('.dropdown').dropdown();
    }, 500);
})

Template.navigation.helpers({
    currentUser: function() {
        return Meteor.user();
    },

    //change to a meteor method later
    profiles: function() {
        var assoc = UserProfile.find({
            userId: Meteor.userId()
        });
        return assoc;
    },

})

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("home");
            }
        });
    }
});

Template.profile.onCreated(function() {
    this.autorun(() => {
        this.subscribe('user.private');
    })
});



Template.profile.helpers({
    formData: function(){
        return UserProfile.findOne({userId: Meteor.userId()})
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

        Meteor.call('user.updateProfile', profile, function(err, result){
            if(err){
                alert(err);
            } else {
                alert('profile updated!');
            }
        });
        //Meteor update
    }

});

Template.joincall.onCreated(function() {
    this.autorun(() => {
        this.subscribe('messages');
    })
    
});

Template.joincall.helpers({
    messages: function(){
        // return Messages.find({owner: Meteor.userId(), to: Iron.controller().getParams().toid }, {sort: {timestamp: 1}})
        return Messages.find({ $or: 
            [ {owner: Meteor.userId(), to: Iron.controller().getParams().toid},
             {owner: Iron.controller().getParams().toid, to: Meteor.userId()} ]}, {sort: {timestamp: 1}});
    },
    currentUser: function() {
        return Meteor.userId();
    },
    toUser: function() {
        return this.params.toid;
    },
    currentProfile: function(){
        return UserProfile.findOne({userId: Meteor.userId()});

    }


});

Template.joincall.events({
    'click #sendmessage': function(event){
        event.preventDefault()
        var message = {}
        message.message = $('[name=content]').val();
        $('[name=content]').val('');
        message.to = Iron.controller().getParams().toid;
        message.owner = Meteor.userId();

        Meteor.call('insertMessage', message, function(err, result){
            if(err) alert(err);
        });

    }

});


