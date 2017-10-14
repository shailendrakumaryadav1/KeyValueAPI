//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let models = require('../api/models/keyValueModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Models', () => {
    beforeEach((done) => { //Before each test we empty the database
        console.log('Before executed.');
        models.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET object/Key_K', () => {
        it('it should GET the value for key = Key_K', (done) => {
            chai.request(server)
                .get('/object/Key_K')
                .end((err, res) => {
                    console.log('inside end block');
                    res.should.have.status(404);
                    //res.body.should.be.a('array');
                    //res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});