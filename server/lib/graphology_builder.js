const Graph = require("graphology").Graph;
const KnowledgeGraphModel = require("../models/KnowledgeItem");
const _ = require("lodash");

class GraphologyBuilder {
  constructor(data) {
    this.data = data;
    this._edges = [];
    this._nodes = [];
    this._graphKey = _.template("KnowledgeItem#<%= node_id %>");
    this._graph = new Graph();
  }

  getValFromKey(data, key) {
    return data[key];
  }

  graph() {
    return this._graph;
  }

  parseNode(data) {
    //   console.log(data)
    // TODO: recursively create nodes
    const key = this._graphKey({ node_id: this.getValFromKey(data, "_id") });
    if (
      _.find(this._nodes, v => {
        return v.key === key;
      }) !== undefined
    )
      return;
    let props = {};
    _.keys(KnowledgeGraphModel).forEach(modelKey => {
      if (
        _.get(KnowledgeGraphModel, `${modelKey}.type`) === "relationships" &&
        _.has(data, `${modelKey}`)
      ) {
        // build edge
        // console.log(
        //   "parseNode: ",
        //   modelKey,
        //   this.getValFromKey(data, modelKey)
        // );
        if (_.isEmpty(_.get(data, `${modelKey}`))) {
          return;
        } else {
          this.buildEdge(
            this.getValFromKey(data, modelKey),
            key,
            _.get(KnowledgeGraphModel, `${modelKey}.type`)
          );
        }
      } else if (_.has(data, modelKey)) {
        // console.log("Node: ", modelKey, this.getValFromKey(data, modelKey));
        // props = _.merge(props, {
        //   [modelKey]: this.getValFromKey(data, modelKey)
        // });
        _.set(props, `${modelKey}`, this.getValFromKey(data, modelKey));
      }
    });
    // console.log("parseNode: ", key, props);
    return { node_key: key, node_attributes: props };
  }

  buildGraph() {
    // for all node data
    this.data.forEach(node_data => {
      this.buildNode(node_data);
    });
    // console.log(this._nodes);
    // console.log(this._edges);
    this._graph.import({
      nodes: this._nodes,
      edges: this._edges
    });
  }

  buildNode(data) {
    const result = this.parseNode(data);
    if (result == undefined) {
      // console.log(result);
      return;
    } else {
      const { node_key, node_attributes } = result;
      this._nodes.push({ key: node_key, attributes: node_attributes });
    }
  }

  parseEdge(source, data, modelProps) {
    const targetNodeName = this._graphKey({ node_id: _.get(data, "node._id") });
    const edgeKey = `${source}->${targetNodeName}`;

    let attributes = {};
    const modelEdgeProps = _.keys(_.get(modelProps, "properties"));
    _.forEach(modelEdgeProps, val => {
      attributes = _.merge(attributes, { val: _.get(data, `${val}`) });
    });

    // find node, if it doesn't exist create node
    if (
      _.find(this._nodes, v => {
        return v.key === targetNodeName;
      }) == undefined
    ) {
      this.buildNode(_.get(data, "node"));
    }
    return {
      key: edgeKey,
      target: targetNodeName,
      source: source,
      attributes: attributes,
      size: 1
    };
  }
  buildEdge(edgeData, source, modelProps) {
    if (_.isArray(edgeData)) {
      _.forEach(edgeData, data => {
        this._edges.push(this.parseEdge(source, data, modelProps));
      });
    } else {
      this._edges.push(this.parseEdge(source, edgeData, modelProps));
    }
  }
}

module.exports = GraphologyBuilder;
