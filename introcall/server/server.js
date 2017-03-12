Meteor.startup(() => {
    console.log('Introcall Server Started.');

	Keywords.insert({word: "sales"});
		
    Meteor.publish('consultants.public', function() {
        return ConsultantProfiles.find();
    });

	Meteor.publish('keywords.public', function() {
        return Keywords.find();
    });

    Meteor.methods({
    	'user.updateProfile' : function(profile){

    		var currentUser = Meteor.userId();
    		if(!currentUser){
        		throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    		}
    		UserProfile.update({userId: currentUser}, 
    			{$set: 
    				{name: profile.name,
    				 userId: currentUser,
    				  phoneNumber: profile.phoneNumber,
    				   email: profile.email} },
    			{multi: false, upsert: true});

    	},
    });
});