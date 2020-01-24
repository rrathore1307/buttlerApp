const express = require('express');
const os = require('os');
import allocatAndReports from './process'
const app = express();
var cors = require('cors');
var bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/client-request', function(req, res) {
    let data = req.body

    let finalResponse = allocatAndReports(data)


	if (finalResponse) {

		res.status(200).json({
			message: 'success response',
			data: finalResponse,
		});
	} else {
		res.status(200).json({
			message: 'Data Not found.',
		});     
	}
});
app.get('/butler-response',function(req,res){
    let data= req.data
    if (data) {
		res.status(200).json({
			message: 'success response',
			data: data,
		});
	} else {
		res.status(200).json({
			message: 'Data Not found.',
		});     
	}

}) ;

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
