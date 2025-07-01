const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

app.use(cors());

app.use(express.json());
app.use('/', routes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});


