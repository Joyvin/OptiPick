const express = require("express");
const cors = require("cors");
const axios = require("axios"); // for sending HTTP requests
const app = express();
const port = 4000;

app.use(cors()); // Use cors middleware
app.use(express.json()); // for parsing application/json

app.post("/endpoint", async (req, res) => {
  console.log(req.body); // your JSON payload
  console.log(req.body.url);
  // Send a POST request to the Next.js server
  const response = await axios.post("http://localhost:3000/endpoint", {
    url: req.body.url,
  });
  console.log(response.data);
  console.log(response);
  res.status(200).send(response);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
