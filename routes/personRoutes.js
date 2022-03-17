const router = require("express").Router();
const { findByIdAndUpdate } = require("../db");
const Person = require("../db");

const data = [];

router.post('/create', (req, res, next) => {
    const name = req.body.name;
    new Person(name).save().then(() => {
        res.status(201).send(`${name} added successfully`);
    }).catch(err => next({staus: 400, message: err.message}))
});
    
router.get("/getAll", (req, res, next) => {
    Person.find((err, name) => {
        if(err)
        return next({status: 400, message: err.message});
        else
        return res.json(name);
    })
});

router.get("/get/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id, (err, found) => {
    if (err)
        return next ({status: 400, message: err.message});
    else if (!found)
        return next({ status: 404, message: "No person with this id: " + id});
    else
        return res.send(found);

    });
})


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
    Person.findByIdAndUpdate(id, newName, (err, replaced) =>
    {
        if (err)
        return next ({status: 400, message: err.message});
        else
        return res.status(202).send(replaced);
    })  
});

//     data.splice(id, 1, newName);
//     res.status(202).json(data[id]);

// });

// router.get('/delete/:id', (req, res) => {
//     res.send(names.splice(req.params.id, 1));
// });

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id,(err) => {
        if (err)
            return next({status: 400, mesage: err.message});
        else
            return res.sendStatus(204);
    })
});
//     data.splice(id, 1);
//     res.sendStatus(204);

// })

module.exports = router;