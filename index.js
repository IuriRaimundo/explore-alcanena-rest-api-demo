const login = require('./routes/login.js');
const documents = require('./routes/documents.js');
const auth = require('./middleware/auth.js');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(auth);
app.use('/api/admin', login);
app.use('/api/admin', documents);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ligado na porta ${PORT}...`);
});
