const { auth } = require('../firebase.js');
const jwt = require('jsonwebtoken');

function login(req, res) {
  if (!req.body.email || !req.body.password) return res.status(400).send('É necessário enviar um email e uma palavra passe.');

  auth
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((response) => {
      const { email } = response.user;
      auth.signOut();
      if (email === process.env.ADMIN_0 || email === process.env.ADMIN_1) {
        const token = jwt.sign({ user: `${email}` }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token: token });
      } else {
        return res.status(401).send('Inicie sessão com uma conta de administrador.');
      }
    })
    .catch((err) => {
      return res.status(401).send('Falha ao iniciar sessão.');
    });
}

module.exports = login;
