<template>
  <div id="editor"></div>
</template>

<script>
import { WebGLRenderer } from "sigma";
// import Graph from "graphology";
import { circular } from "graphology-layout";
import { api } from "@/plugins";

export default {
  name: "GraphEditorComponent",
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

    renderer.on("clickNode", ({ node, captor }) => {
      console.log("Clicking:", node, captor);
    });
    renderer.on("clickStage", () => {
      console.log("Clicking the stage.");
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
