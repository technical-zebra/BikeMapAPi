const appInsights = require("applicationinsights");
appInsights
  .setup(
    "InstrumentationKey=07a5bff7-18e6-49f9-b926-3bf5c03e1712;IngestionEndpoint=https://eastasia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://eastasia.livediagnostics.monitor.azure.com/"
  )
  .start();

const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3001;

const fetchData = async (Lat, Long, Dist) => {
  try {
    const url =
      "http://datamall2.mytransport.sg/ltaodataservice/BicycleParkingv2";
    const params = new URLSearchParams({
      Lat,
      Long,
      Dist,
    });
    const headers = {
      AccountKey: "BIYCkkcYT/eTc9whKEPSEQ==",
    };

    const response = await fetch(`${url}?${params.toString()}`, {
      headers,
    });
    const data = await response.json();
    allData = data;
    return data;
  } catch (error) {
    ø;
    console.error(error);
    throw error;
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/get", async (req, res) => {
  const { Lat, Long, Dist } = req.query;
  try {
    const data = await fetchData(Lat, Long, Dist);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
