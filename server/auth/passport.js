const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , JWTStrategy = require('passport-jwt').Strategy
    , ExtractJWT = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcrypt');
const jwtSecret = require('./jwtConfig');

const Accounts = require('../model/accountsModel');

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
            passReqToCallback: true
        },
        (req, username, password, done) => {
            try {
                // check if user already exists
                Accounts.readAccountByUsername(username).then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        // user exists
                        return done(null, false, {message: 'Username already taken.'});
                    }
                    else {
                        console.log(JSON.stringify(req.body));
                        Accounts.createAccount(username, password, req.body.sec_question, req.body.sec_answer).then(docRef => {
                            docRef.get().then(documentSnapshot => {
                                return done(null, {id: documentSnapshot.ref.id, data: documentSnapshot.data()});
                            });
                        });
                    }
                });
            }
            catch {
                done(err);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy (
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        function (username, password, done) {
            try {
                Accounts.readAccountByUsername(username).then(querySnapshot => {
                    // verify username
                    if (querySnapshot.empty) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    const userData = querySnapshot.docs[0];
                    // verify password
                    if (!bcrypt.compareSync(password, userData.get('password'))) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }

                    // everything is verified
                    return done(null, {id: userData.ref.id, data: userData.data()});
                });
            }
            catch (err) {
                done(err);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

passport.use(
    'jwt',
    new JWTStrategy(opts, (jwt_payload, done) => {
        try {
            Accounts.readAccountByID(jwt_payload.id).then(documentSnapshot => {
                // verify user exists
                if (documentSnapshot.exists) {
                    done(null, {id: documentSnapshot.ref.id, data: documentSnapshot.data()});
                }
                else {
                    done(null, false);
                }
            })
        }
        catch (err) {
            done(err);
        }
    })  
);