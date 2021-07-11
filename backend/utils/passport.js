const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (config, knex) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  };

  const strategy = new passportJWT.Strategy(opts, (payload, done) => {
    if (!payload.exp || new Date() > new Date(payload.exp * 1000)) {
      return done(new Error('Authentication Error'), null);
    }
    const userQuery = knex
      .select('*')
      .from('users')
      .where('email', payload.email || '')
      .first();
    userQuery.then(user => {
      if (user) {
        return done(null, { user });
      } else {
        return done(new Error('Authentication Error'), null);
      }
    });
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => (req, res, next) => {
      return passport.authenticate('jwt', config.jwtSession, async (err, data, info) => {
        if (err || info || !data) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        return next();
      })(req, res, next);
    },
  };
};
