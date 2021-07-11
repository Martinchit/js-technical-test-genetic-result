class AuthMiddleware {
  constructor(jwt, error) {
    this.jwt = jwt;
    this.error = error;
  }

  decryptBearerToken = async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization.split(' ')[1];
      const { id } = await this.jwt.verify(bearerToken, process.env.JWT_SECRET);
      req.userId = id;
      next();
    } catch (e) {
      res.status(403).json(this.error('Unauthorized.', 'Invalid Token.', 403));
    }
  };
}

module.exports = AuthMiddleware;
