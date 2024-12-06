const {Firestore} = require("@google-cloud/firestore");
const path = require('path');

// const pathKey = path.resolve('./independent-bay-443915-n8-e2ed2cc689f2.json');

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.STORAGE_ACCESS_KEY,
});

async function storeData(id, data) {
  try {
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
  } catch (e) {
    console.error(e);
  }
};

async function fetchData() {
  const predictCollection = db.collection('prediction');
  return predictCollection.get();
};

module.exports = { storeData, fetchData };