module.exports = (tmpl) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <link rel="stylesheet" href="main.css">
  <style>
    .container {
      width: 800px;
      margin: 0 auto;
    }
    .limiter {
    width: 100%;
    margin: 0 auto;
  }
  
  .container-table100 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .wrap-table100 {
  
  }
  
  table {
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  table * {
    position: relative;
  }
  table td, table th {
    padding-left: 8px;
  }
  table thead tr {
    height: 60px;
    background: #36304a;
  }
  table tbody tr {
    height: 50px;
  }
  table tbody tr:last-child {
    border: 0;
  }
  table td, table th {
    text-align: left;
    padding-right: 30px;
  }
  table td.l, table th.l {
    text-align: right;
  }
  table td.c, table th.c {
    text-align: center;
  }
  table td.r, table th.r {
    text-align: center;
  }
  
  
  .table100-head th{
    font-family: OpenSans-Regular;
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }
  
  tbody tr {
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
    font-weight: unset;
  }
  
  tbody tr:hover {
    color: #555555;
    background-color: #f5f5f5;
    cursor: pointer;
  }
  
  .column1 {
    width: 260px;
    padding-left: 40px;
  }
  
  .column2 {
    width: 160px;
  }
  
  .column3 {
    width: 245px;
  }
  
  .column4 {
    width: 110px;
    text-align: right;
  }
  
  .column5 {
    width: 170px;
    text-align: right;
  }
  
  .column6 {
    width: 222px;
    text-align: right;
    padding-right: 62px;
  }
  
  </style>
  <body>
    <div class="container">
      ${tmpl}
    </div>
  </body>
  </html>
  `
}