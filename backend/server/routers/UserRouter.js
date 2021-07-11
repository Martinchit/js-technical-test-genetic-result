const express = require('express');

class UserRouter {
  constructor(userService, authMiddleware) {
    this.userService = userService;
    this.authMiddleware = authMiddleware;
  }

  router() {
    const router = express.Router();
    router.get(
      '/personal_info',
      this.authMiddleware.decryptBearerToken.bind(this),
      this.getPersonalInfo.bind(this),
    );
    return router;
  }

  getPersonalInfo(req, res) {
    return this.userService
      .getPersonalInfo(req)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.status(err.code).json(err);
      });
  }
}

module.exports = UserRouter;
