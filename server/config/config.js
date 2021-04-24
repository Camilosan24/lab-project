const config = {
   production: {
       SECRET: process.env.SECRET,
       DATABASE: process.env.MONGODB_URI,
   },
   default:{
       SECRET: 'SUPERSECRETPASSWORD123',
       DATABASE: 'mongodb+srv://camilo_userdb:kHYIRc5yhcNriY5q@lab-project.hsxdt.mongodb.net/labproject?retryWrites=true&w=majority',
   }
}

exports.get = function get(env){
   return config[env] || config.default
}