//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let models = require('../api/models/keyValueModel');
let controllers = require('../api/controllers/keyValueController');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let KeyTimeValues = mongoose.model(KEY_TIME_VALUES);

const message = 'message';
const key = 'key';
const value = 'value';
const timestamp = 'timestamp';

chai.use(chaiHttp);
//Our parent block
describe('clear models', () => {
    beforeEach((done) => { //Before each test we empty the database
        KeyTimeValues.remove({}, (err) => {

            var key_value1_item = new KeyTimeValues({
                key: 'Key_1',
                value: 'Value_at_10000',
                timestamp: 10000
            });

            var key_value2_item = new KeyTimeValues({
                key: 'Key_1',
                value: 'Value_at_20000',
                timestamp: 20000
            });

            key_value1_item.save(function (err, result) { });
            key_value2_item.save(function (err, result) { });

            done();
        });
    });

    /*
      * Test the /GET route
      */
    describe('/GET object/Key_not_exist', () => {
        it('it should GET the value for key = Key_not_exist when key does not exist at any time.', (done) => {
            chai.request(server)
                .get('/object/Key_not_exist')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(message);
                    res.body[message].should.equal(KEY_DOES_NOT_EXIST);
                    done();
                });
        });
    });

    describe('/GET object/Key_1?timestamp=9999', () => {
        it('it should GET the value for key = Key_1 when key exist but not at that timestamp', (done) => {
            chai.request(server)
                .get('/object/Key_1?timestamp=9999')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(message);
                    res.body[message].should.equal(KEY_DOES_NOT_EXIST_AT_TIMESTAMP);
                    done();
                });
        });
    });

    describe('/GET object/Key_1?timestamp=10000', () => {
        it('it should GET the old value for key = Key_1 since timestamp is 10000', (done) => {
            chai.request(server)
                .get('/object/Key_1?timestamp=10000')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(value);
                    res.body[value].should.equal("Value_at_10000");
                    done();
                });
        });
    });

    describe('/GET object/Key_1?timestamp=10001', () => {
        it('it should GET the old value for key = Key_1 since timestamp is 15000', (done) => {
            chai.request(server)
                .get('/object/Key_1?timestamp=10001')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(value);
                    res.body[value].should.equal("Value_at_10000");
                    done();
                });
        });
    });

    describe('/GET object/Key_1', () => {
        it('it should GET the latest value for key = Key_1', (done) => {
            chai.request(server)
                .get('/object/Key_1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(value);
                    res.body[value].should.equal("Value_at_20000");
                    done();
                });
        });
    });

    describe('/GET object/Key_1?timestamp=20000', () => {
        it('it should GET the new value for key = Key_1 since timestamp is 20000', (done) => {
            chai.request(server)
                .get('/object/Key_1?timestamp=20000')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(value);
                    res.body[value].should.equal("Value_at_20000");
                    done();
                });
        });
    });

    describe('/GET object/Key_1?timestamp=19999', () => {
        it('it should GET the old value for key = Key_1 since timestamp is 19999', (done) => {
            chai.request(server)
                .get('/object/Key_1?timestamp=19999')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(value);
                    res.body[value].should.equal("Value_at_10000");
                    done();
                });
        });
    });


    /*
      * Test the /POST route
      */
    describe('/POST object', () => {
        it('it should not POST an object without any request body', (done) => {
            let pair = null;
            chai.request(server)
                .post('/object')
                .send(pair)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(message).eql(KEY_VALUE_FORMAT_ERROR);
                    done();
                });
        });

        it('it should not POST an object with multiple key-value pair in request body', (done) => {
            let pair = {
                key1: "value1",
                key2: "value2"
            }
            chai.request(server)
                .post('/object')
                .send(pair)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(1);
                    res.body.should.have.property(message).eql(KEY_VALUE_FORMAT_ERROR);
                    done();
                });
        });

        it('it should POST an object with a key-value pair in request body', (done) => {
            let pair = {
                key1: "value1"
            }
            chai.request(server)
                .post('/object')
                .send(pair)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.equal(3);
                    res.body.should.have.property(key).eql('key1');
                    res.body.should.have.property(value).eql('value1');

                    KeyTimeValues.find({ key: "key1", value: "value1" },
                        function (err, result) {
                            result.length.should.equal(1);
                            res.body.should.have.property(timestamp).eql(result[0].timestamp);
                        })
                    done();
                });
        });
    });
});