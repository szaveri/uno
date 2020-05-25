const express = require('express');
const path = require('path');
const app = express();

const APP_PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req: any, res: any) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(APP_PORT);

console.log(`Serving on port ${APP_PORT}`);