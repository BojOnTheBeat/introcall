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
                'post': 'Add a new User Profile'
            },
            '/UserProfile/:_id':{
                'options':'',
                'patch':'Update the User Profile with _id',
                'delete': 'Delete the userProfile with _id'
            },
            '/Keywords' : {
                'post': 'Add a new keyword'
            },
            '/Keywords/:_id': {
                'patch':'Update the keyword with _id',
                'delete': 'Delete the keyword with _id',
                'options': ''
            },
            '/messages' : {
                'options' : '',
                'post' : 'Add a new message'
            },
            '/messages/:_id' : {
                'options':'',
                'patch':'Update the message with _id',
                'delete': 'Delete the message with _id'
            },
            '/publications/users.public': {
                'get' : 'Get a list of all users'
            },
            '/publications/keywords.public': {
                'get' : 'Get a list of all keywords \n Response: 200 \n \t content-type: application/json \n \t body: Keyword object \n \t \t_id: keyword id \n \t \t word: (string) actaul keyword string',
            },
            '/publications/user.private': {
                'get' : '????'
            },
            '/publications/messages': {
                'get' : 'get all messages'
            },
            '/methods/user.updateProfile': {
                'post' : 'A logged in user can update their profile,'
            },
            '/methods/insertMessage' : {
                'post' : 'Insert a new message'
            },
            '/methods/connectTimekit' : {
                'post' : 'Connect to TimeKit Api'
            },
            '/methods/timekit.calendarList' : {
                'post' : 'Add a new Calendar ?'
            },
            '/methods/notify' : {
                'post' : 'Notify user of a new message',
                'options': ''
            },


        }
        
        if (docs[rid] && docs[rid][method])
            return docs[rid][method];
        else
            return ''
    }
})