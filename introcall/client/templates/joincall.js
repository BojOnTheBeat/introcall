Template.joincall.onCreated(function() {
    this.autorun(() => {
        this.subscribe('messages');
        this.subscribe('serverMessages');
    })

});

Template.joincall.helpers({
    messages: function() {
        // return Messages.find({owner: Meteor.userId(), to: Iron.controller().getParams().toid }, {sort: {timestamp: 1}})
        return Messages.find({
            $or: [{
                    owner: Meteor.userId(),
                    to: Iron.controller().getParams().toid
                },
                {
                    owner: Iron.controller().getParams().toid,
                    to: Meteor.userId()
                }
            ]
        }, {
            sort: {
                timestamp: 1
            }
        });
    },
    currentUser: function() {
        return Meteor.userId();
    },
    toUser: function() {
        return Iron.controller().getParams().toid;
    },
    currentProfile: function() {
        return UserProfile.findOne({
            userId: Meteor.userId()
        });

    },
    getName: function(id) {
        return UserProfile.findOne({
            userId: id
        }).name;

    },

    color: function(messageOwnerId) {
        if (Meteor.userId() != messageOwnerId) {
            return true;
        }

    },
    scroll: function() {
        $('.messages').stop().animate({
            scrollTop: $('.messages')[0].scrollHeight
        }, 800);
        return false;

    },

});

Template.joincall.events({
    'keypress input': _.throttle(function(e) {
        var inputVal = $('.input-box_text').val();
        var message = {};
        message.to = Iron.controller().getParams().toid;
        message.owner = Meteor.userId();
        

        if (!!inputVal) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;


            if (charCode == 13) {

                message.message = $('.input-box_text').val();
                e.stopPropagation();
                Meteor.call('insertMessage', message, function(err, result) {
                    if (err) {
                        alert(err);
                    }
                });
                $('.input-box_text').val("");

                $('.messages').stop().animate({
                    scrollTop: $('.messages')[0].scrollHeight
                }, 800);

                sub = {}
                sub.subject = "New Message";
                sub.toId = message.to;

                var message = "From " + UserProfile.findOne({
                    userId: Meteor.userId()
                }).name;
                var type = 'success';

                Meteor.call('notify', 'serverMessage:' + type, sub, message, {
                    userCloseable: true,
                    timeout: 5000
                });

                return false;
            }
        }

        //See that the user is typing
        sub = {}
        sub.subject = UserProfile.findOne({
            userId: Meteor.userId()
        }).name;
        sub.toId = message.to;

        var message = "Is typing... ";
        var type = 'info';

        Meteor.call('notify', 'serverMessage:' + type, sub, message, {
            userCloseable: true,
            timeout: 5000
        });
    }, 300)

});