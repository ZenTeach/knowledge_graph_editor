<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    class="override_defaults"
    ref="EditDialogBox"
  >
    <v-card>
      <v-card-title>
        <span class="headline"
          >Update node data for node : {{ nodeAttributes.label }}</span
        >
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :placeholder="nodeAttributes.value"
                v-model="value"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :placeholder="nodeAttributes.statement"
                v-model="statement"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :placeholder="nodeAttributes.topic"
                v-model="topic"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :placeholder="nodeAttributes.examboard"
                v-model="examboard"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed dark small @click.stop="confirmDeleteDialog = true"
          >Delete node</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="closeDialogBox()"
          >Close</v-btn
        >
        <v-btn color="blue darken-1" text @click="submit()">Save</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog
      v-model="confirmDeleteDialog"
      class="override_defaults"
      max-width="300px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            Are you sure you want to delete this node?
          </span></v-card-title
        >
        <v-card-actions>
          <v-btn @click.stop="deleteNode()">Confirm</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.stop="confirmDeleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
export default {
  name: "EditDialogBoxComponent",
  props: {
    dialogController: {
      type: Boolean,
      default: false,
      required: true
    },
    nodeAttributes: Object
  },
  inject: ["eventBus"],
  computed: {
    dialog() {
      return this.dialogController;
    }
  },
  data: () => ({
    value: "",
    topic: "",
    statement: "",
    examboard: "",
    confirmDeleteDialog: false
  }),
  methods: {
    submit() {
      const payload = {
        Label: this.value,
        Topic: this.topic,
        Statement: this.statement,
        ExamBoard: this.examboard
      };

      console.log(payload);
      // TODO: Finish this part
      // api.put(`/api/v1/knowledgeitem/${this.nodeAttributes.id}`, payload);
    },
    clear() {
      this.value = "";
      this.topic = "";
      this.statement = "";
      this.examboard = "";
    },
    closeDialogBox() {
      this.$refs.EditDialogBox.value = false;
    },
    deleteNode() {
      // remove from graph instance
      this.eventBus.$emit("delete-node", this.nodeAttributes.label);
      this.confirmDeleteDialog = false;
      // remove from db, api call
      // api.delete(`/api/v1/knowledgeitem/${this.nodeAttributes.id}`);
    }
  }
};
</script>

<style>
.override_defaults {
  display: block;
}
</style>
