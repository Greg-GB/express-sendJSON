'use strict';

var sendJSON = require('../index');
var should = require('should');
var expressMock = function () {
    var mock = {
        http: {},
        res: {
            status: function(code) {
                mock.http.statusCode = code;
                return mock.res;
            },
            json: function(data) {
                mock.http.body = data;
                return mock.http;
            }
        },
        use: function(middleware) {
            return middleware({}, mock.res, function(){});
        }
    };
    return mock;
};

describe('sendJSON', function() {
    var app;

    beforeEach(function() {
        app = expressMock();
    });

    describe('Middleware defaults', function() {

        it('Should have data', function() {
            app.use(sendJSON({}));
            var res = app.res.sendJSON({});
            res.body.should.have.property('data', {});
        });

        it('Should have not have count when data is not an array', function() {
            app.use(sendJSON({}));
            var res = app.res.sendJSON({});
            res.body.should.not.have.property('count');
        });

        it('Should not throw an error without options', function() {
            should(function(){
                return app.use(sendJSON())
            }).not.throw();
        });

        it('Should throw an error when options is not an object', function() {
            should(function(){
                return app.use(sendJSON('asdf'))
            }).throw('Options must be an object.');
        });
    });

    describe('Middleware override options', function() {

        it('Should have statusCode of 200', function() {
            app.use(sendJSON({
                statusCode: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON({});
            res.body.should.have.property('statusCode', 200);
        });

        it('Should have statusCode of 201', function() {
            app.use(sendJSON({}));
            var res = app.res.sendJSON({}, 201);
            res.body.should.have.property('statusCode', 201);
        });

        it('Should wrap response in res', function() {
            app.use(sendJSON({
                responseProperty: {
                    value: "res"
                }
            }));
            var res = app.res.sendJSON();
            res.body.should.have.property('res', {});
        });

        it('Should have count when data is an array', function() {
            app.use(sendJSON({
                count: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON([{}]);
            res.body.should.have.property('count', 1);
        });

        it('Should have status of default value success', function() {
            app.use(sendJSON({
                status: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON([{}]);
            res.body.should.have.property('status', "success");
        });

        it('Should have status of default value error for Error', function() {
            app.use(sendJSON({
                status: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON(new Error());
            res.body.should.have.property('status', "error");
        });

        it('Should have status of passed', function() {
            app.use(sendJSON({
                status: {
                    enabled: true,
                    value: function(data) {
                        return "asdf";
                    }
                }
            }));
            var res = app.res.sendJSON([{}]);
            res.body.should.have.property('status', "asdf");
        });

        it('Should have apiVersion of default value 1.0.0', function() {
            app.use(sendJSON({
                apiVersion: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON([{}]);
            res.body.should.have.property('apiVersion', "1.0.0");
        });

        it('Should have apiVersion of 2.0.0', function() {
            app.use(sendJSON({
                apiVersion: {
                    enabled: true,
                    value: "2.0.0"
                }
            }));
            var res = app.res.sendJSON([{}]);
            res.body.should.have.property('apiVersion', "2.0.0");
        });

        it('Should have statusCode from Error', function() {
            app.use(sendJSON({
                statusCode: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON(new Error(), 400);
            res.body.should.have.property('statusCode', 400);
        });

        it('Should have statusCode 500 if Error does not have statusCode', function() {
            app.use(sendJSON({
                statusCode: {
                    enabled: true
                }
            }));
            var res = app.res.sendJSON(new Error());
            res.body.should.have.property('statusCode', 500);
        });
    });
});