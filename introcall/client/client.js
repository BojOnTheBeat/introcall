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
Router.route('/bookings', function(){
    var q = this.params.query;
    var con = this;

    if (q.token){
        Meteor.call('connectTimekit', {token: q.token, email: q.email}, function(err, result){
            if(err) alert(err);
            con.redirect('/bookings');
        })
    }

    Meteor.call('timekit.calendarList', function(err, result){
        if (err) alert(err);
    })

    this.render('bookings', {
        data: function(){
            return {
                timekitSetupUrl: 'https://api.timekit.io/v2/accounts/google/signup?Timekit-App=introcall-348&callback=' 
                + window.location.origin + "/bookings"
            }
        }
    });
});


Router.route('/meet/:userid', {
    layoutTemplate: 'main',
    template: 'meet'
});

Template.registerHelper('curProfile', function() {
    return UserProfile.findOne({
        userId: Meteor.userId()
    })
})


Template.registerHelper('isEqual', function(a, b) {
    return a == b;
})

Template.bookings.events({
    'click .setdef': function(event){
        Meteor.call('user.updateProfile', {timekitDefaultCal: event.target.id}, false, function(err, result){
            if(err) alert(err);
        })
    }
})

Template.registerHelper('currentRouteIs', function (route) { 
  return Router.current().route.getName() === route; 
});

Template.meet.helpers({
    otherUser: function() {
        return UserProfile.findOne({
            userId: Iron.controller().getParams().userid
        })
    }
})

Template.meet.onRendered(function() {
    var t = new TimekitBooking();

    this.autorun(() => {
        var p = UserProfile.findOne({
            userId: Iron.controller().getParams().userid
        })
        if (p && p.timekitDefaultCal) {
            t.timekitSdk.setUser(p.timekitApiEmail, p.timekitApiToken);
            t.init({
                app: 'introcall-348',
                email: p.timekitApiEmail,
                apiToken: p.timekitApiToken,
                name: p.name,
                avatar: p.avatarUrl,
                calendar: p.timekitDefaultCal
            })
        }
    })
});


Template.main.onCreated(function() {
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

Template.joincall.onCreated(function() {
    this.autorun(() => {
        this.subscribe('messages');
        this.subscribe('serverMessages');
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

    },
    getName: function(id){
        return UserProfile.findOne({userId: id}).name;


    },

    color: function(messageOwnerId){
        if (Meteor.userId() != messageOwnerId){
            return true;
        }

    },
    scroll: function(){
        $('.messages').stop().animate({
            scrollTop: $('.messages')[0].scrollHeight
        }, 800);
        return false;

    },


});

Template.joincall.events({
    'keypress input': function(e) {
        var inputVal = $('.input-box_text').val();
        if(!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                
                var message = {};
                message.to = Iron.controller().getParams().toid;
                message.owner = Meteor.userId();
                message.message = $('.input-box_text').val();
                e.stopPropagation();
                Meteor.call('insertMessage', message, function(err, result){
                    if(err) {
                        alert(err);
                    }
                });
                $('.input-box_text').val("");

                $('.messages').stop().animate({
                  scrollTop: $('.messages')[0].scrollHeight
                }, 800);

                return false;
            }
        }
        sub = {}
        sub.subject = "New Message";
        sub.toId = message.to;

        var message = "From " + UserProfile.findOne({userId: Meteor.userId()}).name;
        var type = 'success'; 

        Meteor.call('notify', 'serverMessage:' + type, sub, message, {
            userCloseable: true,
            timeout: 5000
        });
    },

});



// Listen for notifications from the server
serverMessages.listen('serverMessage:success', function (subject, message, options) {
    //Don't show notifications to sender
    if (Meteor.userId() == subject.toId){
        Notifications.success(subject.subject, message, options);
    }
  });


