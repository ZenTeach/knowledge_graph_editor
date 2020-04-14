var sw = require("swagger-node-express");
var _ = require("lodash");
var logger=require("../logger");

exports.writeResponse = function writeResponse(res, response, status) {
  sw.setHeaders(res);
  res.status(status || 200).send(JSON.stringify(response));
};

exports.writeError = function writeError(res, error, status) {
	sw.setHeaders(res);
	logger.error(error);
  res
    .status(error.status || status || 400)
    .send(JSON.stringify(_.omit(error, ["status"])));
};
