import strategy from "passport-jwt";
import passport from "passport";
import userModel from "../models/user/userModel.js";

const JwtStrategy = strategy.Strategy;
const opts = {};

const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies["_user_"];
  return token;
};

opts.jwtFromRequest = cookieExtractor;

opts.secretOrKey = "WEB!%hrhlylq+ul9xw2*5(9$7xmyzff31=@0w4!=r93w+va7at^quURE";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    userModel.findOne({ _id: jwt_payload?.user._id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);