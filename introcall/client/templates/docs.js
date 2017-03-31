Template.docs.helpers({
    getComment : function(rid, method){
        docs = {
            '/publications/api-routes': {
                'get': 'get a list of all available REST API routes'
            },
            '/publications/meteor_autoupdate_clientVersions' : {
                'get': ''
            },
            '/UserProfile':{
                'post': 'Add a new User Profile/Simple sign up \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/UserProfile/:_id':{
                'options':'',
                'patch':'Update the User Profile with _id',
                'delete': 'Delete the userProfile with _id'
            },
            '/Keywords' : {
                'post': 'Add a new keyword n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/Keywords/:_id': {
                'patch':'Update the keyword with _id',
                'delete': 'Delete the keyword with _id',
                'options': ''
            },
            '/messages' : {
                'options' : '',
                'post' : 'Add a new message n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/messages/:_id' : {
                'options':'',
                'patch':'Update the message with _id',
                'delete': 'Delete the message with _id'
            },
            '/publications/users.public': {
                'get' : 'Get a list of all users \n Response: 200 \n \t - content-type: application/json \n \t - body: list of User objects\
                \n curl --request GET --url https://alpha.introcall.io//publications/users.public'
            },
            '/publications/keywords.public': {
                'get' : 'Get a list of all keywords \n Response: 200 \n \t - content-type: application/json \n \t - body: Keyword object \n \t \t - _id: keyword id \n \t \t - word: (string) actual keyword string \n \n \
                \n curl --request GET --url https://alpha.introcall.io//publications/users.public',
            },
            '/publications/user.private': {
                'get' : '????'
            },
            '/publications/messages': {
                'get' : 'get all messages the logged in user has been involved in \n Response: 200 \n \t - content-type: application/json \n \t - body: list of message objects \
                \n curl --request GET --url https://alpha.introcall.io/publications/messages?=  --header \'authorization: Basic YmpmYXRhZGVAZ21haWwuY29tOmludHJvY2FsbA==\''
            },
            '/methods/user.updateProfile': {
                'post' : 'A logged in user can update their profile \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/methods/insertMessage' : {
                'post' : 'Insert a new message \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/methods/connectTimekit' : {
                'post' : 'Connect to TimeKit Api \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/methods/timekit.calendarList' : {
                'post' : 'Add a new Calendar ? \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile'
            },
            '/methods/notify' : {
                'post' : 'Notify user of a new message \n Request: 200 \n \t - content-type: application/json \n \t - body: user object\
                \n \t \t - email: unique email address \n \t \t - password: unique password \n \
                \n curl --request GET --url https://alpha.introcall.io//UserProfile',
                'options': ''
            },


        }
        
        if (docs[rid] && docs[rid][method])
            return docs[rid][method];
        else
            return ''
    }
})