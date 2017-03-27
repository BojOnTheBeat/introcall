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
Router.route('/bookings', function() {
    var q = this.params.query;
    var con = this;

    if (q.token) {
        Meteor.call('connectTimekit', {
            token: q.token,
            email: q.email
        }, function(err, result) {
            if (err) alert(err);
            con.redirect('/bookings');
        })
    }

    Meteor.call('timekit.calendarList', function(err, result) {
        if (err) alert(err);
    })

    this.render('bookings', {
        data: function() {
            return {
                timekitSetupUrl: 'https://api.timekit.io/v2/accounts/google/signup?Timekit-App=introcall-348&callback=' +
                    window.location.origin + "/bookings"
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

Template.registerHelper('curMeteorUser', function() {
    return Meteor.user();
})

Template.registerHelper('isEqual', function(a, b) {
    return a == b;
})

Template.registerHelper('currentRouteIs', function(route) {
    return Router.current().route.getName() === route;
});

// Listen for notifications from the server
serverMessages.listen('serverMessage:success', function(subject, message, options) {
    //Don't show notifications to sender
    if (Meteor.userId() == subject.toId) {
        Notifications.success(subject.subject, message, options);
    }
});

// Listen for notifications from the server
serverMessages.listen('serverMessage:info', function(subject, message, options) {
    //Don't show notifications to sender
    if (Meteor.userId() == subject.toId) {
        Notifications.info(subject.subject, message, options);
    }
});