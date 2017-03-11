

Router.route('/', {
    name: 'home',
    layoutTemplate: 'home'
});


Router.configure({
    layoutTemplate: 'main',
    data: function() {
        return {
            user: Meteor.user(),
            cprofiles: ConsultantProfiles.find()
        }
    }
});


Router.route('/register');
Router.route('/login');
Router.route('/dashboard');

Template.home.onCreated(function() {
    this.autorun(() => {
        this.subscribe('consultants.public');
    })
});

Template.register.events({
    'submit form': function (e) {
        e.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        //Meteor magic
        Accounts.createUser({
            email: email,
            password: password
        }, function (error) {
            if (error) {
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("home"); // Redirect user if registration succeeds
            }
        });

    },
});



Template.navigation.events({
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.login.events({
    'submit form': function (event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("home");
            }
        });
    }
});