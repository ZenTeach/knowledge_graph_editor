module.exports = {
  id: {
    type: "number",
    primary: true
  },
  label: "string",
  topic: "string",
  statement: {
    type: "string",
    optional: true,
    allow: [""]
    // empty: true,
    // required: false
  },
  examboard: {
    type: "string",
    // empty: true,
    optional: true,
    allow: [""]
    // required: false,
  },
  relates_to: {
    type: "relationships",
    // target: "KnowledgeItem",
    relationship: "RELTYPE",
    direction: "both",
    properties: {
      type: "string"
    },
    eager: true
  }
};
