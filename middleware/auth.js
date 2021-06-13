const { auth } = require('../firebase.js');
const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  if (req.url === '/api/admin/login') return next();

  const token = req.header('x-auth-token');

  if (!token) return res.status(401).send('Token não recebido.');

  try {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return next();
  } catch {
    return res.status(401).send('Token inválido.');
  }
}

module.exports = authorize;
