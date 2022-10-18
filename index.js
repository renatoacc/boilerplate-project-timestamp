// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;
  let dateObject = new Date(dateString);

  if (dateObject.toUTCString() === "Invalid Date") {
    res.json({ error: dateObject.toUTCString() });
  }

  if (/^\d+$/.test(dateString)) {
    dateInt = parseInt(dateString);

    res.json({ unix: Number(dateString), utc: new Date(dateInt).toUTCString() });
  } else {
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }
});

// ------------------------ first solution ----------------------------------

// app.get("/api/:date", (req, res, next) => {

//   if (/^\d+$/.test(req.params.date)) {
//     const date = new Date(req.params.date * 1).toLocaleDateString("en-US");
//     const [month, day, year] = date.match(/\d+/g).map(Number);
//     const utcDateinSecunds = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).toUTCString();
//     res.json({ unix: Number(req.params.date), utc: utcDateinSecunds })
//   } else {
//     const [year, month, day] = req.params.date.match(/\d+/g).map(Number);
//     const inSecunds = Math.floor(new Date(year, month - 1, day));
//     const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)).toUTCString();
//     res.json({ unix: inSecunds.toString(), utc: utcDate });
//   };

// });





// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
