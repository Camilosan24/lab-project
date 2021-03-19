const { User } = require('../models/user');
const userControler = {};

userControler.register = (req,res)=>{
   const user = new User(req.body)
   user.save((err, doc)=>{
     if(err)return res.json({success: false})
     res.status(200).json({success: true,user: doc})
   })
 }

userControler.login = (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user)
			return res.json({
				auth: false,
				message: "Auth failed, email not found",
				userData: false,
			});

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({
					auth: false,
					message: "Wrong password",
					userData: false,
				})

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				return res.cookie("auth", user.token).json({
					auth: true,
					message: "ok",
					userData: user,
				})
			});
		});
	});
};


userControler.auth = (req,res)=>{
   res.json({
       auth:true,
       userData:{
           id:req.user._id,
           email: req.user.email,
       }
   })
 }

 userControler.logout = (req,res)=>{
   req.user.deleteToken(req.token,(err,user)=>{
       if(err) return res.status(400).send(err);
		 return res.status(200)
   })
 }

module.exports = userControler;