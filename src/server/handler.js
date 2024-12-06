const predictClassification = require('../services/inferenceService');
const { storeData, fetchData } = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;
    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    const data = {
      id: id,
      result: label,
      suggestion: suggestion,
      createdAt: createdAt
    }

    await storeData(id, data);
  
    const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    });
    response.code(201);
  
    return response;
}

async function predictionHistories(request, h) {
  try {
    const result = [];

    const histories = await fetchData();

    histories.forEach((snapshot) => {
      const data = snapshot.data();
      result.push({
        id: snapshot.id,
        history: {
          id: data.id,
          result: data.result,
          createdAt: data.createdAt,
          suggestion: data.suggestion,
        },
      });
    });

    const response = h.response({
      status: 'success',
      data: result,
    });
    response.code(200)
    return response;
  } catch (e) {
    const response = h.response({
      status: 'error',
      message: e,
      data: result,
    });
    response.code(500)
    return response;
  }
  
}


 
module.exports = { postPredictHandler, predictionHistories };