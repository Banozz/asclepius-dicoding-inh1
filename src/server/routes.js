const { postPredictHandler, predictionHistories } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000 * 1000,
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  },
  {
    method: 'GET',
    path: '/predict/histories',
    handler: predictionHistories,
  }
]
 
module.exports = routes;