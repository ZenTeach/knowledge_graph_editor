<template>
  <div id="editor"></div>
</template>

<script>
import { WebGLRenderer } from "sigma";
import Graph from "graphology";
import { circular } from "graphology-layout";
import { api } from "@/plugins";

export default {
  name: "GraphEditorComponent",
  mounted: async function() {
    const response = await api.get("/api/knowledgeitems");
    const data = response.data;
    var proccessData = [];
    data.forEach(element => {
      const { Label: value, Topic, Statement, ExamBoard } = element;

      var hash = {
        key: `KnowledgeItem ${element["ID"]}`,
        attributes: {
          label: `KnowledgeItem ${element["ID"]}`,
          x: 1,
          y: 1,
          color: "#FF0",
          size: 10,
          value: value,
          Topic: Topic,
          Statement: Statement,
          ExamBoard: ExamBoard
        }
      };
      proccessData.push(hash);
    });
    const graph = new Graph();
    graph.import({
      nodes: proccessData
    });

    //graph.addEdge("John", "Adam");

    //graph.addEdge("John", "Sam");

    //graph.addEdge("Sam", "Adam");

    circular.assign(graph);

    const editor = document.getElementById("editor");

    new WebGLRenderer(graph, editor, { zIndex: true });
  }
};
</script>

<style>
#editor {
  height: 70vh;
  width: 80vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
