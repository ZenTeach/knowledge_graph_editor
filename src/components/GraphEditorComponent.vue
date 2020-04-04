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

    const renderer = new WebGLRenderer(graph, editor, { zIndex: true });
    renderer.on("clickNode", ({ node, captor }) => {
      console.log("Clicking:", node, captor);
    });
    // Step by step
    // 1. Parent (Editor.vue) container for GraphEditorComponent -> App.vue
    // App -> Parent -> GraphEditor
    // 2. canvas and add background image from draw.io
    // 3. Parent -> router/index.js
    // '/' -> Parent Component
    renderer.on("clickStage", () => {
      console.log("Clicking the stage.");
      // TODO: Implement me
      // 1. create temporary node
      // 2. show the users a modal page -
      // ask the user to edit/create node attributes step-by-step
      // 3. "save"/"cancel" - "save": api call to create node
      // & change node name to smtn else,
      // "cancel" - delete node from graph
      // graph.addNode('Temporary', {
      // 	label: "Freshie",
      // 	x: 1,
      // 	y: 1,
      // 	size: 20
      // })
    });
  }
};
</script>

<style>
#editor {
  position:absolute;
  padding: 2px 30px; 

  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
