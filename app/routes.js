module.exports = function(app, passport) {
	// GET
	app.get('/', function(req,res){
		res.render('index');
	});

	app.get('/login', function(req,res){
		res.render('login', {message: req.flash('loginMessage')});
	});

	app.get('/signup', function(req,res){
		res.render('signup', {message: req.flash('signupMessage')});
	});

	app.get('/profile', function(req,res){
		res.render('profile', {
			user: req.user // get the user out of session and pass to template
		});
	});

	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});


	// POST
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash    : true
	}));


	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash    : true
	}));
};



// functions
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} 
	res.redirect('/');
}