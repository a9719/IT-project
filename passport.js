const user = require('./models/user');
const url = "http://localhost:5000/"

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: url + "auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {  
        user.findOne({ userid : profile.id }).then((currentUser) => {
            if(currentUser) {
                currentUser.save(function(err, newUser) {
                    if(err) {
                        res.sendStatus(400);
                    }
                });

                done(null, currentUser);

            } else {
                new user({

                    userid: profile.id,
                    email: profile._json.email,
                    name: profile.displayName

                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    }
))
