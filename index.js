const express = require('express');
const app = express();
const parser = require("body-parser");

app.use(parser.json());

const personRoutes = require("./routes/personRoutes");

app.get('/', (req, res) => res.send('Hello, my name is Tasnima!'));

// app.post("/create", (req, res) => {
//     const person = req.body;
//     data.push(person);
//     res.status(201).send("Successfully created");
// });

app.use("/person", personRoutes);

app.use((req, res, next) => {
    console.log(req.method,req.url, new Date())
    return next(); //next -> app.post(...)
});

app.use(express.json());    //Put BEFORE request handling

app.post('/create', (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.status(201).send(`${name} added successfully`);
});
let names = ['Kiera', 'Connor', 'Callum', 'Aidan'];
app.get('/getAll', (req, res) => res.send(names));

app.get('/get/:id', (req, res) => res.send(names[req.params.id]));

// app.post('/replace/:index', (req, res) => {
//     const name = req.query.name;
//     const index = req.params.index;
//     const old = names[index];
//     names[index] = name;
//     res.status(202).send(`${old} successfully replaced with ${name}`);
// });

app.put('/replace/:id', (req, res) => {
     const newName = req.query;
     const id = req.params.id;
     data.splice(id, 1, newName);
     res.status(202).json(data[id]);

});

app.delete("/delete/:id", (req, res) => {
     const id = req.params.id;
     data.splice(id, 1);
     res.sendStatus(204);

})

app.use((err, req, res, next) => {

    res.status(err.status).send(err.message);

})

const server = app.listen(4494, () => {
    console.log("Server successfully started on port", server.address().port);
});
