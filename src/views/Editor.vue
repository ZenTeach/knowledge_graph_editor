<template>
  <div>
    <div id="grid-container">
      <canvas id="grid"></canvas>
    </div>
    <graph-editor-component />
  </div>
</template>

<script>
import GraphEditorComponent from "@/components/GraphEditorComponent.vue";

export default {
  name: "About",
  components: {
    GraphEditorComponent
  }
  // mounted: function() {
  //   var canvas = document.getElementById("grid");
  //   // w, h, window.innerWidth, window.innerHeight
  //   //  var w = window.innerWidth // 10
  //   //  var h = window.innerHeight // 10
  //   var w = 15;
  //   var h = 15;
  //   var d = {
  //     w: canvas.offsetWidth,
  //     h: canvas.offsetHeight
  //   };
  //   canvas.setAttribute("width", d.w);
  //   canvas.setAttribute("height", d.h);
  //   var context = canvas.getContext("2d");
  //   var i;
  //   for (i = 0; i < d.w; i += w) {
  //     context.beginPath();
  //     context.strokeStyle = "lightgray";
  //     context.moveTo(i, 0);
  //     context.lineTo(i, d.h);
  //     context.stroke();
  //   }
  //   for (i = 0; i < d.h; i += h) {
  //     context.beginPath();
  //     context.strokeStyle = "lightgray";
  //     context.moveTo(0, i);
  //     context.lineTo(d.w, i);
  //     context.stroke();
  //   }
  // }
};
</script>

<style scoped>
#grid {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1000;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
}
</style>
