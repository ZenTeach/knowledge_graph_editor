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
  const { nodes, _edges } = data;
  neodeInstance.deleteAll("KnowledgeItem").then(() => {
    console.log("Cleaned up dev database");
  });

  nodes.forEach(node => {
    neodeInstance
      .create("KnowledgeItem", node)
      .catch(e => console.log("Error :(", e, e.details));
  });

  //   edges.forEach(async edge => {
  //     // do something
  //     // find source node
  //     try {
  //       let sourceNode = await neodeInstance.first(
  //         "KnowledgeItem",
  //         "ID",
  //         edge["Source"]
  //       );
  //       if (sourceNode) {
  //         console.log("sourceNode is not found", edge["Source"]);
  //         let targetNode = await neodeInstance.first(
  //           "KnowledgeItem",
  //           "ID",
  //           edge["Target"]
  //         );
  //         if (targetNode) {
  //           console.log("sourceNode is not found", edge["Source"]);
  //           sourceNode.relatesTo(targetNode, "RELTYPE", {
  //             Type: edge["Type"]
  //           });
  //         }
  //       }
  //     } catch (e) {
  //       console.log("Error :(", e, e.details);
  //     }
  //     console.log(edge);
  //   });
};
