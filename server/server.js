const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT= 3000;

const corsOptions = {
    origin: 'http://localhost:4000',
    optionSuccessStatus: 204,
    methods: "GET ,POST"
}

app.use(cors(corsOptions));

app.get('/clothes',(req,res)=>{
    const page= parseInt(req.query.page) ||0;
    const perPage= parseInt(req.query.perPage) || 10;
    
    fs.readFile('db.json', 'utf-8', (err, data)=>{
        if(err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
        const jsonData = JSON.parse(data);
        const start = page+perPage;
        const end =start+perPage;

        const result = jsonData.items.slice(start,end);

        res.status(200).json({
            items:result,
            total: jsonData.irms.length,
            page,
            perPage,
            totalPages: Math.ceil(jsonData.items.length / perPage),
        })
    })
})

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT} `)
})