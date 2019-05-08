var fs = require('fs');
var pdf = require('html-pdf');
var current = require('./data');
var options = { format: 'Letter' };
var layout = require('./templates/layout.js');
var tableAirLayout = require('./templates/tableAir');
var tableWaterLayout = require('./templates/tableWater');
var mainLayout = require('./templates/main');

function run (current, callback) {
  const cellRendererAir = (data) => {
    var tmpl = '';
    for(let i = 0; i < data.length; i++) {
      tmpl += `<tr>
        <td class="column1">${data[i]['directoryFactsAir']['airFactsCode']}</td>
        <td class="column2">${data[i]['directoryFactsAir']['airFactsName']}</td>
        <td class="column3">${data[i]['airEmissions']['airFactsAnnualValue']}</td>
        <td class="column4">${data[i]['airEmissions']['airFactsPower']}</td>
      </tr>`
    }
    return tmpl;
  };
  
  const cellRendererWater = (data) => {
    var tmpl = '';
    for(let i = 0; i < data.length; i++) {
      tmpl += `<tr>
        <td class="column1">${data[i]['directoryFactsWater']['waterFactsCode']}</td>
        <td class="column2">${data[i]['directoryFactsWater']['waterFactsName']}</td>
        <td class="column3">${data[i]['waterEmissions']['waterFactsAnnualValue']}</td>
      </tr>`
    }
    return tmpl;
  };
  
  var mainTmpl = mainLayout(current);
  var tableAirTmpl = tableAirLayout(current.elements.air.length, cellRendererAir(current.elements.air))
  var tableWaterTmpl = tableWaterLayout(current.elements.water.length, cellRendererWater(current.elements.water));
  
  var html = layout(mainTmpl + tableAirTmpl + tableWaterTmpl)
   
  pdf.create(html, options).toFile('../app/project/public/report.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
    callback();
  });
}

module.exports = run;


