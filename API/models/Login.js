
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;


var loginSchema = new Schema({
  	username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    emailPassword: {
        type: String
    },
    userType: {
        type: String,
        enum:['A','U'],
        default:'U'
    },
	status: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    collection:'userdetails' 
});

loginSchema.pre("save", function(next) {
    var self = this;

    Login.findOne({email : this.email}, 'email', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            console.warn('results', results);
            self.invalidate("email", "email must be unique");
            next(new Error("email must be unique"));
        } else {
            next();
        }
    });
});

loginSchema.pre("save", function(next) {
    var self = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(self.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            self.password = hash;
            next();
        });
    });
});

// the schema is useless so far
// we need to create a model using it
var Login = mongoose.model('Login', loginSchema);

// make this available to our users in our Node applications
module.exports = Login;