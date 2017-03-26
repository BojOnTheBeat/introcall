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
