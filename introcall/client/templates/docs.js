Template.docs.helpers({
    getComment : function(rid, method){
        docs = {
            '/publications/api-routes': {
                'get': 'get a list of all available REST API routes'
            }
        }
        
        if (docs[rid] && docs[rid][method])
            return docs[rid][method];
        else
            return ''
    }
})