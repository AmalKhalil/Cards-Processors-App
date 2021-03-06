const path = require('path');
const express = require('express')
const app = express()

var port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, '/dist')));
app.get('/*', (req, res) => {
	console.log('request URL  : '+req.url);
	
	if(req.url.endsWith(".js") || req.url.endsWith(".css"))
		res.sendFile(path.join(__dirname, 'dist/cards-processors-app' + req.url));
	else 
		res.sendFile(path.join(__dirname, 'dist/cards-processors-app/index.html'));
 });

app.listen(port, () => console.log('Example app listening on port ' + port))