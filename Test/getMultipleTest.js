var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test Get All Recipes result', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:4000")
			.get("/recipes")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array object with more than 1 recipe object', function (){
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(2);
		expect(response).to.have.headers;
        expect(response).to.be.json;
    });
    
	it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('instruction');
	    expect(requestResult[0]).to.have.property('_id');
		expect(response.body[0]).to.have.deep.property('ingredientList');
		expect(response.body).to.not.be.a.string;
	});

	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
                    // List items contain expected attribute names
					expect(body[i]).to.have.property('instruction');
                    expect(body[i]).to.have.property('ingredientList');
                    expect(body[i]).to.have.property('reviewList');
                    expect(body[i]).to.have.property('recipeId');
                    expect(body[i]).to.have.property('recipeName');
					expect(body[i]).to.have.property('description');
                    expect(body[i]).to.have.property('recipeImage');
                    expect(body[i]).to.have.property('videoLink');
					expect(body[i]).to.have.property('avgRate');
                    expect(body[i]).to.have.property('viewers');

                    // List items contain expected attribute types
                    expect(body[i]).to.have.property('instruction').that.is.a('array');
                    expect(body[i]).to.have.property('ingredientList').that.is.a('array');
                    expect(body[i]).to.have.property('reviewList').that.is.a('array');
                    expect(body[i]).to.have.property('recipeId').that.is.a('string');
                    expect(body[i]).to.have.property('recipeName').that.is.a('string');
					expect(body[i]).to.have.property('description').that.is.a('string');
                    expect(body[i]).to.have.property('recipeImage').that.is.a('string');
                    expect(body[i]).to.have.property('videoLink').that.is.a('string');
					expect(body[i]).to.have.property('avgRate').that.is.a('number');
                    expect(body[i]).to.have.property('viewers').that.is.a('number');

                    // Each list item contains an id
					expect(body[i]).to.have.property('_id');
					expect(body[i]).to.have.property('_id').that.is.a('string');
				}
				return true;
			});
	});	
	
});