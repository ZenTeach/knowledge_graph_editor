"use strict";

var _ = require("lodash");
var neo4j = require("neo4j-driver").v1;

const connString = `bolt://localhost:${process.env.NEO4J_PORT}`;
const { NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
var driver = neo4j.driver(
  connString,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

exports.getSession = function(context) {
  if (context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};
function whereTemplate(name, key, paramKey) {
  return name + "." + key + "={" + (paramKey || key) + "}";
}

exports.dbWhere = function(name, keys) {
  if (_.isArray(name)) {
    _.map(name, obj => {
      return whereTemplate(obj.name, obj.key, obj.paramKey);
    });
  } else if (keys && keys.length) {
    return (
      "WHERE " +
      _.map(keys, key => {
        return whereTemplate(name, key);
      }).join(" AND ")
    );
  }
};
