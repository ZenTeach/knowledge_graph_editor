module.exports = {
  ID: {
    type: "number",
    primary: true
  },
  Label: "string",
  Topic: "string",
  Statement: {
    type: "string",
    optional: true,
    allow: [""]
    // empty: true,
    // required: false
  },
  ExamBoard: {
    type: "string",
    // empty: true,
    optional: true,
    allow: [""]
    // required: false,
  },
  relates_to: {
    type: "relationship",
    target: "KnowledgeItem",
    relationship: "RELTYPE",
    // direction: 'out',
    properties: {
      Type: "string"
    }
  }
};
