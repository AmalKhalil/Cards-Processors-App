const express = require('express')
const app = express()

var port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, '/dist')));
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
 });

app.listen(port, () => console.log('Example app listening on port ' + port))