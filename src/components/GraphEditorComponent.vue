<template>
  <div id="editor"></div>

</template>

<script>
import { WebGLRenderer } from "sigma";
import Graph from "graphology";
import { circular } from "graphology-layout";

export default {
  name: "GraphEditorComponent",
  mounted: function(){
      const graph = new Graph();
    graph.addNode("John", {
      label: "John",
      x: 1,
      y: 1,
      color: "#FF0",
      size: 10
    });
    graph.addNode("Adam", {
      label: "Adam",
      x: 1,
      y: 1,
      color: "#FF0",
      size: 10
    });
    graph.addNode("Sam", {
      label: "Sam",
      x: 1,
      y: 1,
      color: "#FF0",
      size: 10
    });
    graph.addEdge("John", "Adam");

    graph.addEdge("John", "Sam");

    graph.addEdge("Sam", "Adam");

    circular.assign(graph);

    const editor = document.getElementById("editor");

    new WebGLRenderer(graph, editor, {zIndex: true} );
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