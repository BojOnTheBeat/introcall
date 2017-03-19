module.exports = {
  servers: {
    one: {
      host: '159.203.0.221',
      username: 'root',
      pem: '~/.ssh/id_rsa'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'introcall',
    path: '../introcall',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
      debug: true,

    },

    env: {
      ROOT_URL: 'https://alpha.introcall.io',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    ssl: {
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'hassen.isa@gmail.com',
        domains: 'alpha.introcall.io' // comma seperated list of domains
      }
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      image: 'kadirahq/meteord:base',
      bind: '127.0.0.1',
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 120,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
