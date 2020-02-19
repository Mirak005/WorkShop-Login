"use strict";

import { check, validationResult } from "express-validator";

export const registerRules = () => [
  check("login", " this feild is required").notEmpty(),
  check("email", " this feild require a valid mail").isEmail(),
  check("password", " this feild require length of 6 chars ").isLength({
    min: 6,
    max: 20
  })
];

export const loginRules = () => [
  check("email", " this feild require a valid mail").isEmail(),
  check("password", " this feild require length of 6 chars ").isLength({
    min: 6,
    max: 20
  })
];

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};
