<template>
  <div>
    <div id="editor"></div>
    <vuetify-dialog-box-component
      :dialogController="dialogToggle"
      :nodeAttributes="nodeAttributeProps"
    />
  </div>
</template>

<script>
import { WebGLRenderer } from "sigma";
import Graph from "graphology";
import { circular } from "graphology-layout";
import { api } from "@/plugins";
import VuetifyDialogBoxComponent from "@/components/VuetifyDialogBoxComponent.vue";

export default {
  name: "GraphEditorComponent",
  components: {
    VuetifyDialogBoxComponent
  },
  data: function() {
    return {
      tempNode: {},
      dialogToggle: false,
      nodeAttributeProps: {}
    };
  },
  mounted: async function() {
    const response = await api.get("/api/knowledgeitems");
    const data = response.data;
    var proccessData = [];
    data.forEach(element => {
      const { _id: id, Label: value, Topic, Statement, ExamBoard } = element;

      var hash = {
        key: `KnowledgeItem ${element["ID"]}`,
        attributes: {
          label: `KnowledgeItem ${element["ID"]}`,
          id: id,
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
    renderer.on("clickNode", ({ node }) => {
      const {
        id,
        label,
        value,
        Statement,
        Topic,
        ExamBoard
      } = graph.getNodeAttributes(node);
      this.nodeAttributeProps = {
        id: id,
        label: label,
        value: value,
        statement: Statement,
        topic: Topic,
        examboard: ExamBoard
      };
      this.dialogToggle = true;
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
  height: 100vh;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
</style>
