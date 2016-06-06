var express = require('express');
var app = express();
var moment = require('moment');

app.set('port', (process.env.PORT || 5000));


app.get('/:date', function(request, response) {
  var dateParam = request.params.date;
  var resObj = { unix: null, natural: null };
  var m;

  try {
    if (dateParam.match(/^\d+$/)) {
      m = moment.unix(dateParam);
    }
    else {
      m = moment(new Date(dateParam));
    }
    
    var theDate = m.format('MMMM D, YYYY');
    
    if (theDate !== 'Invalid date') {
      resObj.natural = theDate;
      resObj.unix = m.format('X');
    }    
  }
  catch (err) {
  }


  response.send(resObj);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

