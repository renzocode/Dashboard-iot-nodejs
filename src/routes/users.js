const express = require('express');
const userRouter = express.Router();
const User = require('../models/schema_user');
const auth = require('../middleware/auth');

userRouter.route('/users').post(async(req, res)=>{
	const user = new User(req.body);
	try{
		await user.save();
		const token = await user.generateAuthToken();
		res.status(200).send(user);
	}catch(e){
		res.status(400).send(e);
	}
});


userRouter.route('/users/me').get(auth, async(req, res)=>{
	res.send(req.user);
});

userRouter.route('/users/login').post(async(req, res)=>{
	try{
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({user : user.getPublicProfile(), token});

		//console.log(req.params.email);
		//res.send(user);
	}catch(e){
		console.log(req.params.email);
		res.status(400).send();
	}
});


userRouter.route('/users/logout').post(auth, async(req, res)=>{
	try{
		req.user.tokens = req.user.tokens.filter((token)=>{
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	}catch(e){
		res.status(500).send();
	}
});

userRouter.route('/users/logoutAll', auth, async(req, res)=>{
	try{
		req.user.tokens = [];
		await req.user.save();
		res.send();
	}catch(e){
		res.status(500).send();
	}
});



userRouter.route('/users/:id').get(async(req, res)=>{
	const _id = req.params.id;

	try{
		const user = await User.findById(_id);
		if(!user){
			return res.status(404).send();
		}
		res.send(user);
	}catch(e){
		res.status(500).send();
	}
});

userRouter.route('/users/:id').patch(async(req, res)=>{
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

	if(!isValidOperation){
		return res.status(400).send({error: 'Invalid updates!'});
	}
	try{
		const user = await User.findById(req.params.id);
		updates.forEach((update)=> user[update]=req.body[update]);
		await user.save();
		if(!user){
			return res.status(404).send();
		}
		res.send(user);
	}catch(e){
		res.status(400).send(e);
	}
});

userRouter.route('/user/:id').delete(async(req, res)=>{
	try{
		const user = await User.findByIdAndDelete(req.params.id);
		if(!user){
			return res.status(404).send();
		}
		res.send(user);
	}catch(e){
		res.status(500).send();
	}
});



module.exports = userRouter;