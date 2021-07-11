const express = require('express');

class GeneticRouter {
  constructor(geneticService, authMiddleware, requestValidation) {
    this.geneticService = geneticService;
    this.authMiddleware = authMiddleware;
    this.requestValidation = requestValidation;
  }

  router() {
    const router = express.Router();
    router.get(
      '/result',
      this.requestValidation.validateGetGeneticResultQuery.bind(this),
      this.authMiddleware.decryptBearerToken.bind(this),
      this.getResult.bind(this),
    );
    return router;
  }

  getResult(req, res) {
    return this.geneticService
      .getResult(req)
      .then(result => {
        res.json({ result });
      })
      .catch(err => {
        res.status(err.code).json(err);
      });
  }
}

module.exports = GeneticRouter;
