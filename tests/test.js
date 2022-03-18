const chai = require("chai"); //importing the chai library 
const chaiHttp = require("chai-http"); //importing the http plugin 
const { deleteOne } = require("../db");

chai.use(chaiHttp); //adding the plugin to the library
const { it, describe, beforeEach } = require('mocha');

const server = require("../index");
const Person = require('../db');

describe("test person", () => {

    let testPerson;

  beforeEach((done) => {
    Person.deleteMany((err) => {
      if (!err) {
        Person.create({
          name: 'Sally',
          age: 25,
        }, (error, created) => {
          if (!error) {
            testPerson = created;
          }
          return done();
        });
      }
    });
  });

    it("should create a person", () => {
        chai.request(server).post("/person/create").send({
            name: "Tasnima",
            age: "23"
        }).end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res).to.haveOwnProperty("text", "Successfully created");
            return done(); //ends test
        });
    });

        it('Should NOT create a person', (done) => {
            chai.request(server).post('/person/create').send().end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res).to.haveOwnProperty('text', 'Person validation failed: age: Path `age` is required., name: Path `name` is required.');
              return done();
            });
          })

          it('Should find a Person', (done) => {
            chai.request(server).get(`/person/get/${testPerson.id}`).end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.haveOwnProperty('name', 'Sally');
              expect(res.body).to.haveOwnProperty('age', 25);
              return done();
            });
    });
} );
