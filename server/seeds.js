const fs = require("fs");

exports.seedKnowledgeItemNodes = function(neodeInstance) {
  const fileContents = fs.readFileSync("./server/data.json", "utf8");
  let data;
  try {
    data = JSON.parse(fileContents);
  } catch (err) {
    console.error(err);
  }
  // eslint-disable-next-line no-unused-vars
  const { nodes, edges } = data;
  neodeInstance.deleteAll("KnowledgeItem").then(() => {
    console.log("Cleaned up dev database");
  });

  nodes.forEach(node => {
    neodeInstance
      .create("KnowledgeItem", node)
      .catch(e => console.log("Error :(", e, e.details));
  });

  neodeInstance
    .cypher(
      "UNWIND $items as item MATCH (source: KnowledgeItem), (target: KnowledgeItem) WHERE source.id = toInteger(item.Source) AND target.id = toInteger(item.Target) CREATE (source)-[:RELTYPE {type:item.Type}]->(target)",
      {
        items: edges
      }
    )
    .then(_res => {
      console.log("Created relationship!");
      // console.log(res.records.length);
    })
    .catch(e => {
      console.log(e);
    });
};
