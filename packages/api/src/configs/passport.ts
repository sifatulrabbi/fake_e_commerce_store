import type {Express} from "express";
import passport from "passport";
import {localStrategy, userDeserializer, userSerializer} from "../libs";

export function configurePassport(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser<string>(userSerializer);
  passport.deserializeUser<string>(userDeserializer);
  passport.use(localStrategy);
}
