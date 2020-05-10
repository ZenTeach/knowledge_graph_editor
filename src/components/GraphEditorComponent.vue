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
    const response = await api.get("/api/v1/knowledgeitems");
    const data = response.data;
    let builder = new this.$graphology_builder(data);
    builder.buildGraph(data);
    let graph = builder.graph();
    graph.forEachNode(node => {
      graph.setNodeAttribute(node, "color", "#FF0");
      graph.setNodeAttribute(node, "size", "10");
    });

    circular.assign(graph);

    const editor = document.getElementById("editor");

    const renderer = new WebGLRenderer(graph, editor, {
      defaultEdgeType: "arrow",
      defaultEdgeColor: "#888",
      renderEdgeLabels: true,
      zIndex: true
    });

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

    renderer.on("clickStage", () => {
      console.log("Clicking the stage.");
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
