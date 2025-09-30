const request = require('supertest');
const app = require('../server');
const { expect } = require('chai');

describe('API Tests', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should return a health check', (done) => {
        request(app)
            .get('/healthz')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('OK');
                done();
            });
    });
});
