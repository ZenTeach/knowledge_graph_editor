<template>
  <div v-on:delete-node="deleteNodeFromGraph()">
    <div id="editor"></div>
    <edit-dialog-box-component
      :dialogController="dialogToggle"
      :nodeAttributes="nodeAttributeProps"
    />
    <create-dialog-box-component :createDialogController="createDialogToggle" />
  </div>
</template>

<script>
import { WebGLRenderer } from "sigma";
import Vue from "vue";
import Graph from "graphology";
import { circular } from "graphology-layout";
import { api } from "@/plugins";
import EditDialogBoxComponent from "@/components/EditDialogBoxComponent.vue";
import CreateDialogBoxComponent from "@/components/CreateDialogBoxComponent.vue";

export default {
  name: "GraphEditorComponent",
  components: {
    EditDialogBoxComponent,
    CreateDialogBoxComponent
  },
  data: function() {
    return {
      tempNode: {},
      dialogToggle: false,
      createDialogToggle: false,
      nodeAttributeProps: {},
      graph: {},
      eventBus: new Vue()
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  mounted: async function() {
    // const NewAttributes = await api.put("/api/graph/node");

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
    this.graph = new Graph();
    this.graph.import({
      nodes: proccessData
    });

    //graph.addEdge("John", "Adam");

    //graph.addEdge("John", "Sam");

    //graph.addEdge("Sam", "Adam");

    circular.assign(this.graph);

    const editor = document.getElementById("editor");

    const renderer = new WebGLRenderer(this.graph, editor, { zIndex: true });
    renderer.on("clickNode", ({ node }) => {
      const {
        id,
        label,
        value,
        Statement,
        Topic,
        ExamBoard
      } = this.graph.getNodeAttributes(node);

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

    this.eventBus.$on("delete-node", this.deleteNodeFromGraph);
    this.eventBus.$on("close-create-dialog-box", this.closeCreateDialogBox);
    this.eventBus.$on("submit-create-dialog-box", this.createNewNode);
    // var func = {
    //   attribute: {
    //     x: Math.random(),
    //     y: Math.random(),
    //     color: "#FF00",
    //     size: 10
    //   },
    //   newNode: function() {
    //     Date.now();
    //   }
    // };

    // Step by step
    // 1. Parent (Editor.vue) container for GraphEditorComponent -> App.vue
    // App -> Parent -> GraphEditor
    // 2. canvas and add background image from draw.io
    // 3. Parent -> router/index.js
    // '/' -> Parent Component
    // v-if: if true, display component, if not hide.
    renderer.on("clickStage", () => {
      //console.log(event);
      // let randx = Math.random();
      // let randy = Math.random();
      console.log("Clicking the stage.");
      // TODO: Implement me
      // 1. create temporary node
      // 2. show the users a modal page -
      // ask the user to edit/create node attributes step-by-step
      // 3. "save"/"cancel" - "save": api call to create node
      // & change node name to smtn else,
      // "cancel" - delete node from graph
      this.createDialogToggle = true;
      this.tempNode = this.graph.addNode(`KnowledgeItem ${Date.now()}`, {
        x: Math.random(),
        y: Math.random(),
        color: "#FF00",
        size: 10
      });
    });
  },
  methods: {
    deleteNodeFromGraph(data) {
      this.graph.dropNode(data);
      this.dialogToggle = false;
    },
    closeCreateDialogBox(val) {
      this.createDialogToggle = val;
      console.log(this.tempNode);
      this.graph.dropNode(this.tempNode);
    },
    createNewNode(val) {
      this.createDialogToggle = val;
    }
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
