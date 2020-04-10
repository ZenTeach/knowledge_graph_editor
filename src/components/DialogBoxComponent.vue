
<template>
<div>
    <dialog open v-if="exampleDialog">
       <form >
        <P style="text-align: center;">Add Properties to Node</P><br>
      <form>
        <label >Value:</label>
        <input type="text" v-model="message1" placeholder="Insert Value" name="value">
      </form>
      <br>
      <form>
        <label >Topic:</label>
        <textarea rows="2" cols="25" v-model="message2" placeholder="Write Topic name" name="topic"></textarea>
      </form>
      <br>
      <form>
        <label >Statement:</label>
        <textarea rows="2" cols="25" v-model="message3" placeholder="Write Statement here" name ="statement"></textarea>
      </form>
      <br>
      <form>
        <label >ExamBoard:</label>
        <textarea rows="2" cols="25" v-model="message4" placeholder="Write Examboard here" name ="examBoard"></textarea>
      </form>
      <br>
      
      <menu>
        <button value="cancel">Cancel</button>
        <button value="save">Save</button>
      </menu>
    </form>
    </dialog>
</div>
  
</template>
<script>
export default {
  name:"DialogBox",
  method: {
    submit() {
      // make API call

      // instead of API call, do emit with data
      
    }
  }
}
</script>
<style >

</style>
    

