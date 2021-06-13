const { firestore } = require('../firebase.js');

function createDoc(req, res) {
  const collection = req.params.collection;
  const body = req.body;

  if (collection !== 'local' && !collection !== 'eventos' && !collection === 'testes') {
    res.status(400).send('Não é permitido criar documentos nesta coleção.');
    return;
  }

  let schema = {};

  // Definir estrutura de dados a enviar
  if (collection === 'local') {
    schema = {
      id: body.id,
      nome: body.nome,
      descrição: body.descrição,
      categorias: body.categorias,
      morada: body.morada,
      coordenadas: [body.coordenadas.lat, body.coordenadas.long],
      serviços: body.serviços ? body.serviços : null,
      email: body.email ? body.email : null,
      facebook: body.facebook ? body.facebook : null,
      telefone: body.telefone ? body.telefone : null,
      website: body.website ? body.website : null,
      imagensGrandes: parseInt(body.imagensGrandes),
      horário: {
        'segunda-feira': body.horário.segundaFeira.abre
          ? [body.horário.segundaFeira.abre, body.horário.segundaFeira.fecha]
          : null,
        'terça-feira': body.horário.terçaFeira.abre ? [body.horário.terçaFeira.abre, body.horário.terçaFeira.fecha] : null,
        'quarta-feira': body.horário.quartaFeira.abre ? [body.horário.quartaFeira.abre, body.horário.quartaFeira.fecha] : null,
        'quinta-feira': body.horário.quintaFeira.abre ? [body.horário.quintaFeira.abre, body.horário.quintaFeira.fecha] : null,
        'sexta-feira': body.horário.sextaFeira.abre ? [body.horário.sextaFeira.abre, body.horário.sextaFeira.fecha] : null,
        sábado: body.horário.sábado.abre ? [body.horário.sábado.abre, body.horário.sábado.fecha] : null,
        domingo: body.horário.domingo.abre ? [body.horário.domingo.abre, body.horário.domingo.fecha] : null,
      },
    };
  } else if (collection === 'eventos') {
    schema = {
      id: body.id,
      nome: body.nome,
      descrição: body.descrição,
      data: body.data.data + ' ' + body.data.hora,
    };
  }

  const documentRef = firestore.collection(collection).doc(body.id);

  documentRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        documentRef
          .set(schema)
          .then(() => {
            res.status(200).send('Documento criado com sucesso!');
          })
          .catch(() => res.status(503).send('Falha ao criar documento.'));
      } else {
        res.status(409).send('Um documento com esse id já existe.');
      }
    })
    .catch(() => {
      res.status(503).send('Falha ao aceder ao firestore.');
    });
}

module.exports = createDoc;
