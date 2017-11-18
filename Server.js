const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

// gives the server access to the public folder
app.use(express.static(__dirname + "/public"));

// get request that serves up the index.htmlpage
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.listen(port, function() {
  console.log("App is running on port ", port);
});
