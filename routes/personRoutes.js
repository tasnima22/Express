const router = require("express").Router();

const data = [];

router.use((req, res, next) => {
    console.log(req.method,req.url, new Date())
    return next(); //next -> app.post(...)
});


router.post('/create', (req, res) => {
    const name = req.body.name;
    names.push(name);
    res.status(201).send(`${name} added successfully`);
});
let names = ['Kiera', 'Connor', 'Callum', 'Aidan'];
router.get('/getAll', (req, res) => res.send(names));

router.get('/get/:id', (req, res) => res.send(names[req.params.id]));

// router.post('/replace/:index', (req, res) => {
//     const name = req.query.name;
//     const index = req.params.index;
//     const old = names[index];
//     names[index] = name;
//     res.status(202).send(`${old} successfully replaced with ${name}`);
// });

router.put('/replace/:id', (req, res) => {
    const newName = req.query;
    const id = req.params.id;
    data.splice(id, 1, newName);
    res.status(202).json(data[id]);

});

// router.get('/delete/:id', (req, res) => {
//     res.send(names.splice(req.params.id, 1));
// });

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    data.splice(id, 1);
    res.sendStatus(204);

})

module.exports = router;