const express = require('express');
const axios = require('axios');

const app = express();

let allData = [];

const fetchData = async () => {
  try {
    const url = 'http://datamall2.mytransport.sg/ltaodataservice/BicycleParkingv2';
    const params = {
      Lat: '1.310104',
      Long: '103.8935379',
      Dist: '0.5',
    };
    const headers = {
      'AccountKey': 'BIYCkkcYT/eTc9whKEPSEQ==',
    };

    const { data } = await axios.get(url, { params, headers });
    allData = data;
  } catch (error) {
    console.error(error);
  }
};

fetchData();

// Add CORS headers to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/get', (req, res) => {
  res.json(allData);
});

app.listen(80, () => {
  console.log('running at 127.0.0.1:80');
});
