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
  name: "VuetifyDialogBoxComponent",
  props: {
    dialogController: {
      type: Boolean,
      default: false,
      required: true
    },
    nodeAttributes: Object
  },
  computed: {
    dialog() {
      return this.dialogController;
    }
  },
  data: () => ({
    value: "",
    topic: "",
    statement: "",
    examboard: ""
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
      // this.$v.$reset()
      this.value = "";
      this.topic = "";
      this.statement = "";
      this.examboard = "";
    },
    closeDialogBox() {
      this.$refs.EditDialogBox.value = false;
    }
  }
};
</script>

<style>
.override_defaults {
  display: block;
}
</style>
