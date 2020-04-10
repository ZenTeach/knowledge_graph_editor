<template>
  <div>
    <div id="editor"></div>

    <dialog-box v-if="exampleDialog"/>
  </div>
</template>

<script>
import { WebGLRenderer } from "sigma";
import Graph from "graphology";
import { circular } from "graphology-layout";
import { api } from "@/plugins";
import DialogBox from "@/components/DialogBoxComponent.vue";

export default {
  name: "GraphEditorComponent",
  // declare component -> DialogBoxComponent
  components: {
    DialogBox
  },
  data: function() {
    return {
      exampleDialog: false,
      tempNode: {},
      message1: '',
      message2: '',
      message3: '',
      message4: '',
      greet:"Hello Saahil, it works"
    };
  },
  mounted: async function() {
   // const NewAttributes = await api.put("/api/graph/node");
    
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
    // var func = {
    //   attribute: {
    //     x: Math.random(),
    //     y: Math.random(),
    //     color: "#FF00",
    //     size: 10
    //   },
    //   newNode:function() {
    //     Date.now();
    //     }

    // };

    // !!!
    // create component for dialog
    // edit attributes
    // Save -> create api post call then close dialog
    // Cancel -> close dialog and delete the node!

    // Step by step
    // 1. Parent (Editor.vue) container for GraphEditorComponent -> App.vue
    // App -> Parent -> GraphEditor
    // 2. canvas and add background image from draw.io
    // 3. Parent -> router/index.js
    // '/' -> Parent Component
    // v-if: if true, display component, if not hide.
    renderer.on("clickStage", () => {
      //console.log(event);
      let randx = Math.random();
      let randy = Math.random();
      console.log("Clicking the stage.");
      // TODO: Implement me
      // 1. create temporary node
      // 2. show the users a modal page -
      // ask the user to edit/create node attributes step-by-step
      // 3. "save"/"cancel" - "save": api call to create node
      // & change node name to smtn else,
      // "cancel" - delete node from graph
      // TODO: Do not create nodes randomly!
      this.exampleDialog = true;
      graph.addNode(`KnowledgeItem ${Date.now()}`, {
        x: randx,
        y: randy,
        color: "#FF00",
        size: 10
      });
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
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
</style>
