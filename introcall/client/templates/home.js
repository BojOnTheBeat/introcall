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
