/* eslint-disable no-unused-vars */
require('dotenv').config();

class AuthService {
  constructor(knex, jwt, bcrypt, logger, error, config) {
    this.knex = knex;
    this.jwt = jwt;
    this.bcrypt = bcrypt;
    this.logger = logger;
    this.error = error;
    this.config = config;
    this.tokenActiveTime = process.env.TOKEN_EXPIRY_TIME || 60;
  }

  async logIn(req) {
    try {
      const { email, password } = req.body;
      const [account] = await this.knex('users')
        .select('*')
        .where('email', email);
      if (!account) {
        throw new Error('login error - Invalid Email');
      }
      const isPasswordCorrect = await this.bcrypt.compare(password, account.password);
      if (!isPasswordCorrect) {
        throw new Error('login error - Invalid password');
      }
      const payload = {
        id: account.id,
        email: account.email,
        createdAt: account.createdAt,
      };
      const token = await this.jwt.sign(payload, this.config.jwtSecret, {
        expiresIn: `${this.tokenActiveTime}m`,
      });
      return { token };
    } catch (e) {
      this.logger.error('login error - ', e);
      throw this.error('Log In Error', 'Please try again', 400);
    }
  }
}

module.exports = AuthService;
