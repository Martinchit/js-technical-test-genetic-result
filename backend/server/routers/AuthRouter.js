const express = require('express');

class AuthRouter {
  constructor(authService, requestValidation) {
    this.authService = authService;
    this.requestValidation = requestValidation;
  }

  router() {
    const router = express.Router();
    router.post(
      '/log-in',
      this.requestValidation.validateLoginBody.bind(this),
      this.logIn.bind(this),
    );
    return router;
  }

  logIn(req, res) {
    return this.authService
      .logIn(req)
      .then(({ token }) => {
        res.json({ token });
      })
      .catch(err => {
        res.status(err.code).json(err);
      });
  }
}

module.exports = AuthRouter;
