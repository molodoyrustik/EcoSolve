var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var createReport = require('./soft/index');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const MongoClient = require('mongodb').MongoClient;
 
const url = 'mongodb://localhost:27017';
const dbName = 'gis';

app.post('/api/report/', (req, res) => {
	createReport(req.body.current, () => {
		res.json({text: 'all ok'})
	})
});

app.get('/api/objects', (req, res) => {
	(async () => {
		let client = await MongoClient.connect(url, { useNewUrlParser: true });
		let db = client.db(dbName);
	
		try {
			const airEmissions = db.collection('airEmissions')
			const airMeasureTools = db.collection('airMeasureTools')
			const directoryFactsAir = db.collection('directoryFactsAir')
			const directoryFactsWaste = db.collection('directoryFactsWaste')
			const directoryFactsWater = db.collection('directoryFactsWater')
			const directoryOKATO = db.collection('directoryOKATO')
			const factsAir = db.collection('factsAir')
			const factsWaste = db.collection('factsWaste')
			const factsWater = db.collection('factsWater')
			const object = db.collection('object'); // точки
			const record = db.collection('record') // организация
			const wasteTotalAnnualValue = db.collection('wasteTotalAnnualValue')
			const waterEmissions = db.collection('waterEmissions')
			const waterMeasure = db.collection('waterMeasure')

			const data = {
				airEmissions :  await airEmissions.find({}).toArray(),
				airMeasureTools : await airMeasureTools.find({}).toArray(),
				directoryFactsAir : await directoryFactsAir.find({}).toArray(),
				directoryFactsWaste : await directoryFactsWaste.find({}).toArray(),
				directoryFactsWater : await directoryFactsWater.find({}).toArray(),
				directoryOKATO : await directoryOKATO.find({}).toArray(),
				factsAir : await factsAir.find({}).toArray(),
				factsWaste : await factsWaste.find({}).toArray(),
				factsWater : await factsWater.find({}).toArray(),
				object : await object.find({}).toArray(),
				record : await record.find({}).toArray(),
				wasteTotalAnnualValue : await wasteTotalAnnualValue.find({}).toArray(),
				waterEmissions : await waterEmissions.find({}).toArray(),
				waterMeasure : await waterMeasure.find({}).toArray(),
			}

			const arr = [];
			data.object.forEach((li) => {
				const code = li.code;
				const elements = {
					air: [],
					water: [],
				}

				data.airEmissions.forEach((item) => {
					let element = {};
					if(item.code === code) {
						element['airEmissions'] = item;
						element['directoryFactsAir'] = data.directoryFactsAir.filter((airItem) => {
							return item.airFactsCode === airItem.airFactsCode;
						})[0];
						elements.air.push(element);
					}
				})

				data.waterEmissions.forEach((item) => {
					let element = {};
					if(item.code === code) {
						element['waterEmissions'] = item;
						element['directoryFactsWater'] = data.directoryFactsWater.filter((airItem) => {
							return item.waterFactsCode === airItem.waterFactsCode;
						})[0];
						elements.water.push(element);
					}
				})

				const result = {
					object: li,
					record: data.record.filter((item) => {
						return code === item.code;
					})[0],
					factsAir: data.factsAir.filter((item) => {
						return code === item.code;
					})[0],
					elements,
					factsWater: data.factsWater.filter((item) => {
						return code === item.code;
					})[0],
					wasteTotalAnnualValue: data.wasteTotalAnnualValue.filter((item) => {
						return code === item.code;
					})[0],
					factsWaste: data.factsWaste.filter((item) => {
						return code === item.code;
					})[0],
					directoryFactsWaste: data.directoryFactsWaste.filter((item) => {
						return factsWaste.code === item.code;
					})[0],
				}
				arr.push(result);
			}) 
			res.json(arr);
		}
		finally {
			client.close();
		}
	})()
	.catch(err => console.error(err));
})


app.get('/api/objects/:id', (req, res) => {
	(async () => {
		const code = req.params.id
		let client = await MongoClient.connect(url, { useNewUrlParser: true });
		let db = client.db(dbName);
	
		try {
			const airEmissions = db.collection('airEmissions')
			const airMeasureTools = db.collection('airMeasureTools')
			const directoryFactsAir = db.collection('directoryFactsAir')
			const directoryFactsWaste = db.collection('directoryFactsWaste')
			const directoryFactsWater = db.collection('directoryFactsWater')
			const directoryOKATO = db.collection('directoryOKATO')
			const factsAir = db.collection('factsAir')
			const factsWaste = db.collection('factsWaste')
			const factsWater = db.collection('factsWater')
			const object = db.collection('object'); // точки
			const record = db.collection('record') // организация
			const wasteTotalAnnualValue = db.collection('wasteTotalAnnualValue')
			const waterEmissions = db.collection('waterEmissions')
			const waterMeasure = db.collection('waterMeasure')

			const data = {
				airEmissions :  await airEmissions.find({}).toArray(),
				airMeasureTools : await airMeasureTools.find({}).toArray(),
				directoryFactsAir : await directoryFactsAir.find({}).toArray(),
				directoryFactsWaste : await directoryFactsWaste.find({}).toArray(),
				directoryFactsWater : await directoryFactsWater.find({}).toArray(),
				directoryOKATO : await directoryOKATO.find({}).toArray(),
				factsAir : await factsAir.find({}).toArray(),
				factsWaste : await factsWaste.find({}).toArray(),
				factsWater : await factsWater.find({}).toArray(),
				object : await object.find({}).toArray(),
				record : await record.find({}).toArray(),
				wasteTotalAnnualValue : await wasteTotalAnnualValue.find({}).toArray(),
				waterEmissions : await waterEmissions.find({}).toArray(),
				waterMeasure : await waterMeasure.find({}).toArray(),
			}

			const result = {
				object: data.object.filter((item) => {
					return code === item.code;
				})[0],
				record: data.record.filter((item) => {
					return code === item.code;
				})[0],
				factsAir: data.factsAir.filter((item) => {
					return code === item.code;
				})[0],
				factsWater: data.factsWater.filter((item) => {
					return code === item.code;
				})[0],
				wasteTotalAnnualValue: data.wasteTotalAnnualValue.filter((item) => {
					return code === item.code;
				})[0],
				factsWaste: data.factsWaste.filter((item) => {
					return code === item.code;
				})[0],
				directoryFactsWaste: data.directoryFactsWaste.filter((item) => {
					return factsWaste.code === item.code;
				})[0],
			}
			res.json(result);
		}
		finally {
			client.close();
		}
	})()
	.catch(err => console.error(err));
})

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});
