const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
function genToken(params = {}){
	return jwt.sign({ id: params.id }, authConfig.secret, {
		expiresIn: 86400,
	})
};

function authTest(req, res, next){
	const authHeader = req.headers.authorization;
	if(!authHeader){
		return res.status(401).send({error: "no token"});
	}
	const parts = authHeader.split(" ");
	if(!parts.length === 2){
		return res.status(401).json({error: "token error"});
	}
	const [scheme, token] = parts;
	if(!/^Magic$/i.test(scheme)){
		return res.status(401).json({error: "no magic"});
	}
	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if(err){return res.status(401).json({error: "token invalid"});}
		console.log(decoded);
		req.userId = decoded.id;
		return next();
	});
}

module.exports = { genToken, authTest };

/*

2) The login route:

app.post('/login', function (req, res) {
  var post = req.body;
  if (post.user === 'john' && post.password === 'johnspassword') {
    req.session.user_id = johns_user_id_here;
    res.redirect('/my_secret_page');
  } else {
    res.send('Bad user/pass');
  }
});
3) The logout route:

app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
}); 

*/
