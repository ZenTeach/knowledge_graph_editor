<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    class="override_defaults"
    ref="CreateDialogBox"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Creating a new node</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field label="Label" v-model="value"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Statement"
                v-model="statement"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Topic" v-model="topic"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="ExamBoard"
                v-model="examboard"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click.stop="closeDialogBox()"
          >Close</v-btn
        >
        <v-btn color="blue darken-1" text @click="submit()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateDialogBoxComponent",
  inject: ["eventBus"],
  props: {
    createDialogController: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    dialog() {
      return this.createDialogController;
    }
  },
  data: () => ({
    value: "",
    topic: "",
    statement: "",
    examboard: "",
    color: ""
  }),
  methods: {
    reset() {
      this.value = "";
      this.topic = "";
      this.statement = "";
      this.examboard = "";
    },

    submit() {
      const payload = {
        Label: this.value,
        Topic: this.topic,
        Statement: this.statement,
        ExamBoard: this.examboard
      };
      console.log(payload);
      this.eventBus.$emit("submit-create-dialog-box", false);
      // api.post('...', payload)
      this.reset();
    },
    closeDialogBox() {
      this.eventBus.$emit("close-create-dialog-box", false);
    }
  }
};
</script>

<style scoped>
.circle-button {
  border-radius: 100%;
}
</style>
