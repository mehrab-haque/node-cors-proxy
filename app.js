const express = require('express');
const axios=require('axios')
const cors = require('cors')
const bodyParser=require('body-parser')

// Create Express Server
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Configuration
const PORT = 8000;
const HOST = "localhost";
const API_SERVICE_PROTOCOL="https"
const API_SERVICE_URL = "0344-103-94-135-11.ngrok-free.app";



// Proxy endpoints
app.all('/*', async function(req, res) {
    var reqBody={
        method: req.method.toLowerCase(),
        url: `${API_SERVICE_PROTOCOL}://${API_SERVICE_URL}${req.path}`,
        data: req.body,
        headers:{authorization:req.headers['authorization']}
      }

    


    try{
        var response=await axios(reqBody);
        res.status(response.status).json(response.data)

    }catch(err){
        console.log(err)
        res.status(err.response.status).json(err.response.data)
    }
  })

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});