const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const { Stocks } = require("../models");

module.exports = {
    importstock: async (req,res)=>{
        try {
            const results = [];

            fs.createReadStream('sample file 2.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
              const stockData = results.map((row) => ({
                sku: row.sku,
                stock_ids: row.stock_ids.split('|').join(','),
              }));
      
              await Stocks.bulkCreate(stockData, {
                fields: ['sku', 'stock_ids'], // Specify the fields to insert
                validate: true, // Perform validation
              });
      
              res.send('Import successful');
              });
        
        } catch (err) {
            console.log(err);
            return res
              .status(err.status || 500)
              .send(err.message || "Something went wrong!");
        }
    },
    exportstock: async (req, res) => {
        try {
          const stocks = await Stocks.findAll({
            attributes: ['sku', 'stock_ids'],
          });
      
          const stockData = stocks.map(stock => ({
            sku: stock.sku,
            stock_ids: stock.stock_ids,
          }));
      
          const workbook = xlsx.utils.book_new();
          const worksheet = xlsx.utils.json_to_sheet(stockData, { header: ['sku', 'stock_ids'] });
          xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
          // Save workbook
          const outputPath = 'D:/Practice/Node Tasks/sample2.xlsx'; 
          xlsx.writeFile(workbook, outputPath);
      
          res.send('Sample 2 file generated successfully');
        } catch (err) {
          console.log(err);
          return res.status(err.status || 500).send(err.message || 'Something went wrong!');
        }
      }
}