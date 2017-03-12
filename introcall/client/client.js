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
            cprofiles: ConsultantProfiles.find(kfilter)
        }
    }
});

Router.configure({
    layoutTemplate: 'main',
    data: function() {
        return {
            user: Meteor.user()
        }
    }
});

Router.route('/register');
Router.route('/login');
Router.route('/dashboard');
Router.route('/joincall');

Template.home.onCreated(function() {
    this.autorun(() => {
        this.subscribe('consultants.public');
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
        console.log('running');
        $('.dropdown').dropdown();
    }, 500)
})

Template.navigation.helpers({
    currentUser: function() {
        return Meteor.user();
    },

    //change to a meteor method later
    profiles: function() {
        var assoc = ConsultantProfiles.find({
            userId: Meteor.userId()
        });
        return assoc;
    },

    defaultProfile: function() {
        var assoc1 = ConsultantProfiles.find({
            userId: Meteor.userId()
        });
        return assoc1[0];
    }
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

var videoClient;
var activeRoom;
var previewMedia;
var identity;
var roomName;

Template.joincall.onCreated(function() {
    identity = 'boj';

    //TODO: Autogenerate via server.
    videoClient = new Twilio.Video.Client(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2JjMjJhNDgzOWQ5N2YzZjIyYWI4NzYwNzViMjlhZjZhLTE0ODkyNzM5NjAiLCJpc3MiOiJTS2JjMjJhNDgzOWQ5N2YzZjIyYWI4NzYwNzViMjlhZjZhIiwic3ViIjoiQUNhZjYzZmQ4NGM5YWIyNzI3NjZkOTdiZGJiNjlmYTNkOSIsImV4cCI6MTQ4OTI3NzU2MCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiYm9qIiwicnRjIjp7ImNvbmZpZ3VyYXRpb25fcHJvZmlsZV9zaWQiOiJWUzU3NDI3MjZlNDk5Yzk5MzYwYjYwNmRmNmYwZTdkNTY1In19fQ.QPLVc7Tr60yWNlS_cdcLKuTFTamfA2DJWcLVU2VtnBw'
    );
    roomName = 'Ayye' //TODO: Change this

    videoClient.connect({
        to: roomName
    }).then(roomJoined,
        function(error) {
            console.log('Could not connect to Twilio: ' + error.message);
        });

});

function roomJoined(room) {
    activeRoom = room;
    console.log("Joined as '" + identity + "'");

    // Show local video, if not already previewing
    if (!previewMedia) {
        room.localParticipant.media.attach('#local-media');
    }

    room.participants.forEach(function(participant) {
        console.log("Already in Room: '" + participant.identity + "'");
        participant.media.attach('#remote-media');
    });

    // When a participant joins, show their video on screen
    room.on('participantConnected', function(participant) {
        console.log("Joining: '" + participant.identity + "'");
        participant.media.attach('#remote-media');
    });

    // When a participant disconnects, note in log
    room.on('participantDisconnected', function(participant) {
        console.log("Participant '" + participant.identity + "' left the room");
        participant.media.detach();
    });

    // When we are disconnected, stop capturing local video
    // Also remove media for all remote participants
    room.on('disconnected', function() {
        console.log('Left');
        room.localParticipant.media.detach();
        room.participants.forEach(function(participant) {
            participant.media.detach();
        });
        activeRoom = null;
    });
}