function verifyCollectionLocal(data) {
  const acceptedFields = {
    id: '',
    nome: '',
    morada: '',
    descrição: '',
    email: '',
    website: '',
    facebook: '',
    telefone: '',
    booking: '',
    imagensGrandes: '',
    coordenadas: {
      lat: '',
      long: '',
    },
    categorias: [],
    serviços: [],
    horário: {
      segundaFeira: {
        abre: '',
        fecha: '',
      },
      terçaFeira: {
        abre: '',
        fecha: '',
      },
      quartaFeira: {
        abre: '',
        fecha: '',
      },
      quintaFeira: {
        abre: '',
        fecha: '',
      },
      sextaFeira: {
        abre: '',
        fecha: '',
      },
      sábado: {
        abre: '',
        fecha: '',
      },
      domingo: {
        abre: '',
        fecha: '',
      },
    },
  };

  const requiredFields = {
    id: '',
    nome: '',
    morada: '',
    descrição: '',
    imagensGrandes: '',
    categorias: [],
    coordenadas: {
      lat: '',
      long: '',
    },
  };

  let valid = true;

  // Verificar se existem os campos obrigatórios
  Object.entries(requiredFields).forEach((entry) => {
    if (!data.hasOwnProperty(entry[0])) {
      valid = false;
      return valid;
    }
  });

  // Verificar se todos os campos são aceites e se são verdadeiros
  Object.entries(data).forEach((entry) => {
    if (!acceptedFields.hasOwnProperty(entry[0])) {
      valid = false;
      return valid;
    }
  });

  // Verificar número de imagens
  if (isNaN(parseInt(data.imagensGrandes)) || data.imagensGrandes < 1 || data.imagensGrandes > 5) {
    valid = false;
    return valid;
  }

  // Verificar categorias
  const categorias = ['natureza', 'jardins-e-miradouros', 'cultura', 'restaurantes', 'pastelarias', 'cafés', 'alojamento'];
  if (data.categorias.length < 1 || !Array.isArray(data.categorias)) {
    valid = false;
    return valid;
  } else {
    data.categorias.forEach((element) => {
      if (!categorias.includes(element)) {
        valid = false;
        return valid;
      }
    });
  }

  // Verificar coordenadas
  const lat = data.coordenadas.lat;
  const long = data.coordenadas.long;
  if (lat.length < 5 || long.length < 5) {
    valid = false;
    return valid;
  } else if (isNaN(parseFloat(lat)) || isNaN(parseFloat(long))) {
    valid = false;
    return valid;
  }

  // Verificar serviços
  if (data.hasOwnProperty('serviços')) {
    if (!Array.isArray(data.serviços)) {
      valid = false;
      return valid;
    }
    const serviços = ['wifi', 'takeaway', 'reserva', 'acessibilidade', 'ginásio', 'bar', 'restaurante'];
    if (data.serviços.length !== 0) {
      data.serviços.forEach((element) => {
        if (!serviços.includes(element)) {
          valid = false;
          return;
        }
      });
    }
  }

  // Verificar horário
  if (data.hasOwnProperty('horário')) {
    if (typeof data.horário !== 'object') {
      valid = false;
      return valid;
    }

    const dias = ['segundaFeira', 'terçaFeira', 'quartaFeira', 'quintaFeira', 'sextaFeira', 'sábado', 'domingo'];
    dias.forEach((element) => {
      if (!data.horário.hasOwnProperty(element) || typeof data.horário[element] !== 'object') {
        valid = false;
        return valid;
      }

      const abre = data.horário[element].abre;
      const fecha = data.horário[element].fecha;

      if (abre.length !== 0 && fecha.length !== 0) {
        if (!abre.includes(':') || !fecha.includes(':') || abre.length <= 3 || fecha.length <= 3) {
          valid = false;
          return;
        }
      } else if (abre.length !== 0 || fecha.length !== 0) {
        valid = false;
        return;
      }
    });
  }

  return valid;
}

function verifyCollectionEventos(data) {
  const requiredFields = {
    id: '',
    nome: '',
    data: {
      data: '',
      hora: '',
    },
    descrição: '',
  };

  let valid = true;

  // Verificar se existem os campos obrigatórios e se são verdadeiros
  Object.entries(requiredFields).forEach((entry) => {
    if (!data.hasOwnProperty(entry[0]) || !data[entry[0]]) {
      valid = false;
      return;
    }
  });

  // Verificar data
  if (
    !data.data.data.includes('/') ||
    !data.data.hora.includes(':') ||
    data.data.data.length < 6 ||
    data.data.hora.length < 3 ||
    !Date.parse(data.data.data)
  ) {
    valid = false;
    return valid;
  }

  return valid;
}

function validate(req, res, next) {
  const collection = req.params.collection;

  if (collection === 'local') {
    return verifyCollectionLocal(req.body) ? next() : res.status(400).send('Dados inválidos.');
  } else if (collection === 'eventos') {
    return verifyCollectionEventos(req.body) ? next() : res.status(400).send('Dados inválidos.');
  } else {
    next();
  }
}

module.exports = validate;
