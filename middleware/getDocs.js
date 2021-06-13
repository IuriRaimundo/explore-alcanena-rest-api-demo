const { firestore } = require('../firebase.js');

function getDocuments(req, res) {
  const collection = req.params.collection;

  firestore
    .collection(collection)
    .get()
    .then((snapshot) => {
      res.status(200).json(snapshot.docs.map((doc) => doc.data()));
    })
    .catch(() => {
      res.status(503).send('Falha ao buscar documentos.');
    });
}

module.exports = getDocuments;
