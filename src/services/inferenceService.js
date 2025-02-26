const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
 
        const classess = ['Kanker', 'Non-kanker'];

        const suggestionArr = ['Segera periksa ke dokter!', 'Penyakit kanker tidak terdeteksi.']
 
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
 
        const label = confidenceScore > 99 ? classess[0] : classess[1];
 
        let suggestion;
 
        if(label === classess[0]) {
           suggestion = suggestionArr[0];
        }
 
        if(label === classess[1]) {
            suggestion = suggestionArr[1];
        }
 
        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}
 
module.exports = predictClassification;