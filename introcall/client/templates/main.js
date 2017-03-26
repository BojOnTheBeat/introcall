Template.main.onCreated(function() {
    //here's where global subscriptions are setup
    this.autorun(() => {
        this.subscribe('users.public');
    })
});
