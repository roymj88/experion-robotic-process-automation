function validateUser(req, cb){
    var username = (req.query.username === undefined) ?  req.params.username : req.query.username; 
    console.log("user1 : " + username);
    console.log("user2 : " + req.user.name);
    console.log("user3 : " + req.params.username);
    console.log("user3 : " + req.query.username);
	if(req.user.name === username){
		return cb(true); 
	} else {
        return cb(false);
    }
}

module.exports = {
    validateUser : validateUser
}
