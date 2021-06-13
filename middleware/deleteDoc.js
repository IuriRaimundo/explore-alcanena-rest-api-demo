const { firestore } = require('../firebase.js');

function deleteDoc(req, res) {
  const collection = req.params.collection;
  const documentRef = firestore.collection(collection).doc(req.body.id);

  documentRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        documentRef.delete();
        res.status(200).send('Documento eliminado com sucesso.');
      } else {
        res.status(404).send('Documento não existe.');
      }
    })
    .catch(() => {
      res.status(503).send('Falha ao apagar documento.');
    });
}

module.exports = deleteDoc;
