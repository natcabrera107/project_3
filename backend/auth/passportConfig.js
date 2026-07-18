import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getDB } from "../db/connection.js";

// tell passport to use username and password for login
passport.use(
  new LocalStrategy(async function (username, password, done) {
    var db = getDB();

    // look up user in database by username
    var user = await db.collection("users").findOne({ username: username });

    if (user === null) {
      return done(null, false, { message: "User not found" });
    }

    if (user.password !== password) {
      return done(null, false, { message: "Wrong password" });
    }

    return done(null, user);
  }),
);

// save user id to session when they log in
passport.serializeUser(function (user, done) {
  done(null, user._id.toString());
});

// look up full user from database on every request using saved id
passport.deserializeUser(async function (id, done) {
  var db = getDB();
  var { ObjectId } = await import("mongodb");
  var user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  done(null, user);
});

export default passport;
