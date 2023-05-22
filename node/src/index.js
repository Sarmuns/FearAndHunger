const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();


app.use(express.json());


const jsonsFolderPath = path.join(__dirname, 'jsons'); // Assuming the jsons folder is in the same directory as the index.js file
const jsonFiles = fs.readdirSync(jsonsFolderPath).filter(filename => filename.endsWith('.json'));
let jsonObjectsArray = [];

jsonFiles.map(filename => {
    const filePath = path.join(jsonsFolderPath, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    jsonObjectsArray.push(JSON.parse(fileContent));
});




app.get('/armors', (req, res) => {
    const id = req.query.id;
    if (id) {
        res.send(jsonObjectsArray[0][id - 1]);
    } else {
        let treated = [];
        jsonObjectsArray[0].map((armor, index) => {
            const step = {
                "id": armor.id,
                "name": armor.name ? armor.name : "No name in game file",
                "description": armor.description ? armor.description : "No description in game file",
            }
            treated.push(step);
        });
        res.send(treated);
    }
});

app.get('/classes', (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.send(jsonObjectsArray[1]);
    } else {
        res.send(jsonObjectsArray[1][id - 1]);
    }
});

app.get('/enemies', (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.send(jsonObjectsArray[2]);
    } else {
        res.send(jsonObjectsArray[2][id - 1]);
    }
});

app.get('/items', (req, res) => {
    const id = req.query.id;
    if (id) {
        res.send(jsonObjectsArray[3][id - 1]);
    } else {
        let treated = [];
        jsonObjectsArray[3].map((items, index) => {
            const step = {
                "id": items.id,
                "name": items.name ? items.name : "No name in game file",
                "description": items.description ? items.description : "No description in game file",
            }
            treated.push(step);
        });
        res.send(treated);
    }
});

app.get('/skills', (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.send(jsonObjectsArray[4]);
    } else {
        res.send(jsonObjectsArray[4][id - 1]);
    }
});

app.get('/weapons', (req, res) => {
    const id = req.query.id;
    if (id) {
        res.send(jsonObjectsArray[5][id - 1]);
    } else {
        let treated = [];
        jsonObjectsArray[5].map((weapons, index) => {
            const step = {
                "id": weapons.id,
                "name": weapons.name ? weapons.name : "No name in game file",
                "description": weapons.description ? weapons.description : "No description in game file",
            }
            treated.push(step);
        });
        res.send(treated);
    }
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});