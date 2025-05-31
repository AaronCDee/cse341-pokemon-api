import express        from 'express';
import cors           from 'cors';
import passport       from 'passport';
import session        from 'express-session';
import GithubStrategy from 'passport-github2';

import './loadEnv.mjs';

import routes        from './routes/index.mjs'
import swaggerRoutes from './routes/swagger.js';

// Web server
const PORT = process.env.PORT || 8080;
const app  = express();

app.set('trust proxy', true); // NOTE: for Swagger dynamic proto

app.use(session({
  secret:            "secret",
  resave:            false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(cors());
app.use(express.json());

// BaseRoutes
app.use('/api-docs', swaggerRoutes);
app.use('/', routes);
app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});
app.get('/login', passport.authenticate('github'), (req, res) => {});
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect('/');
  })
});
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged out") });

// Global error handling
app.use((err, _req, res, _next) => {
  console.log(err)
  res.status(500).send({ error: "Uh oh! An unexpected error occured." });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
