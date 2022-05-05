// COMMENT: Require npm & core module
const httpProxy = require("http-proxy");
const express = require("express");

const app = express();
const apiProxy = httpProxy.createProxyServer();
const serverOne = "http://localhost:3000";

// COMMENT: Redirect all request to server one
app.all("*", function (req, res) {
  apiProxy.web(req, res, { target: serverOne });
});

// COMMENT: Run server
app.listen(8000);
