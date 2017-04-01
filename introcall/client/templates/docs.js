Template.docs.helpers({
    getComment : function(rid, method){
        docs = {
            '/publications/api-routes': {
                'get': 'Get a list of all available REST API routes. See docs here: https://atmospherejs.com/simple/rest#listing-all-api-methods'
            },
            '/publications/meteor_autoupdate_clientVersions' : {
                'get': 'Meteor.js internal framework method. Used to determine out-of-date client app versions. See Meteor docs.'
            },
            '/UserProfile':{
                'post': 'Add a new User Profile/Simple sign up \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/UserProfile/:_id':{
                'options':'hide',
                'patch':'Update the User Profile with _id',
                'delete': 'Delete the userProfile with _id'
            },
            '/Keywords' : {
                'post': 'Add a new keyword \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - word: string  \n '
            },
            '/Keywords/:_id': {
                'patch':'Update the keyword with _id',
                'delete': 'Delete the keyword with _id',
                'options': ''
            },
            '/messages' : {
                'options' : '',
                'post' : 'Add a new message. See model.js for optional/required message params.'
            },
            '/messages/:_id' : {
                'options':'',
                'patch':'Update the message with _id',
                'delete': 'Delete the message with _id'
            },
            '/publications/users.public': {
                'get' : 'Get a list of all users (UserProfile objects) \n '
            },
            '/publications/keywords.public': {
                'get' : 'Get a list of all keywords',
            },
            '/publications/user.private': {
                'get' : 'Get the current logged-in-user private fields.'
            },
            '/publications/messages': {
                'get' : 'get all messages the logged in user has been involved in \n Response: 200 \n \t - content-type: application/json \n \t - body: list of message objects \
                \n curl --request GET --url https://alpha.introcall.io/publications/messages?=  --header \'authorization: Basic YmpmYXRhZGVAZ21haWwuY29tOmludHJvY2FsbA==\''
            },
            '/methods/user.updateProfile': {
                'post' : 'Update the logged-in user profile '
            },
            '/methods/insertMessage' : {
                'post' : 'Send a new message for a given userid'
            },
            '/methods/connectTimekit' : {
                'post' : 'Connect to TimeKit Api '
            },
            '/methods/timekit.calendarList' : {
                'post' : 'Update the list of Timekit calendar ids associated with a user account. '
            },
            '/methods/notify' : {
                'post' : 'Notify user of a new message ',
                'options': ''
            },


        }
        
        if (docs[rid] && docs[rid][method])
            return docs[rid][method];
        else
            return ''
    }
})