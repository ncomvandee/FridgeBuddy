var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test Get Single Recipe result', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:4000")
			.get("/recipes/find/1")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return a single recipe object', function (){
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
        expect(response).to.be.json;
    });

	it('The recipe has the expected attributes', function(){
        // Recipe contains expected attribute names
        expect(requestResult).to.have.property('instruction');
        expect(requestResult).to.have.property('ingredientList');
        expect(requestResult).to.have.property('reviewList');
        expect(requestResult).to.have.property('recipeId');
        expect(requestResult).to.have.property('recipeName');
        expect(requestResult).to.have.property('description');
        expect(requestResult).to.have.property('recipeImage');
        expect(requestResult).to.have.property('videoLink');
        expect(requestResult).to.have.property('avgRate');
        expect(requestResult).to.have.property('viewers');

        // Recipe contains expected attribute types
        expect(requestResult).to.have.property('instruction').that.is.a('array');
        expect(requestResult).to.have.property('ingredientList').that.is.a('array');
        expect(requestResult).to.have.property('reviewList').that.is.a('array');
        expect(requestResult).to.have.property('recipeId').that.is.a('string');
        expect(requestResult).to.have.property('recipeName').that.is.a('string');
        expect(requestResult).to.have.property('description').that.is.a('string');
        expect(requestResult).to.have.property('recipeImage').that.is.a('string');
        expect(requestResult).to.have.property('videoLink').that.is.a('string');
        expect(requestResult).to.have.property('avgRate').that.is.a('number');
        expect(requestResult).to.have.property('viewers').that.is.a('number');

        // Recipe contains an id
        expect(requestResult).to.have.property('_id');
        expect(requestResult).to.have.property('_id').that.is.a('string');

        return true;
	});	
	
});