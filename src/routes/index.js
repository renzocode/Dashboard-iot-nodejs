const fs = require('fs');
//console.log(fs);
const express = require('express');
const gameRoutes =  express.Router();
let Game = require('../models/schema_game');


gameRoutes.route('/add').post(function(req, res){
	fs.open(req.body.img);
	let game = new Game({
		title : req.body.title,
		content : req.body.content,
		author : req.body.author,
		comment : req.body.comment,
		img : req.body
	});
	//console.log(req.files);
	game.save(function(err){
		if(err){
			return handleError(err);
		}
		res.send(game);
	});
});


gameRoutes.route('/edit/:id').get(function(req, res){
	let id =  req.params.id;
	Game.findById(id, function(err, game){
		res.json(game);
	});
});

gameRoutes.route('/all').get(function(req, res){
	Game.find(function(err, games){
		if(err){
			return handleError(err);
		}else{
			res.json(games);
		}
		//console.log(games);
	});
});


gameRoutes.route('/update/:id').post(function(req, res){
	Game.findById(req.params.id, function(err, game){
		if(!game){
			return next(new Error('could not load Documents'));
		}else{
			game.name = req.body.name;
			game.price = req.body.price;

			game.save().then(game =>{
				res.json('Update completed');
			}).catch(err => {
				res.status(400).send('unable to update');
			});
		}
	});
});


gameRoutes.route('/delete/:id').get(function(req, res){
	Game.findByIdAndRemove({
		_id : req.params.id
	}, function(err, game){
		if(err){
			res.json(err)
		}else{
			res.json('successfully removed');
		}
	});
});

gameRoutes.route('/views').get(function(req, res){
	/*
	Game.find(function(err, games){
		if(err){
			return handleError(err);
		}else{
			res.json(games);
		}
		console.log(games);
	});

	*/
	//res.sendFile( __dirname + "/public/" + "index.html" );
	res.render('index')
	//res.redirect('../signin.html');
});


module.exports = gameRoutes;





















