<template>
  <div class="notes-editor">
    <quill-editor
      v-model="content"
      :options="editorOptions"
      class="quill-editor-full">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  name: "NotesEditor",
  components: {
    quillEditor,
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorOptions: {
        theme: 'snow',
        modules: {
         
        },
      },
    };
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style scoped>
.notes-editor {
  width: 100%;
  height: 100%;
}

.quill-editor-full {
  height: calc(100vh - 350px);
  min-height: 600px;
}

.quill-editor-full ::v-deep .ql-container {
  height: calc(100vh - 400px);
  min-height: 550px;
  font-size: 16px;
  font-family: 'Helvetica', sans-serif;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: none;
}

.quill-editor-full ::v-deep .ql-editor {
  min-height: calc(100vh - 400px);
  min-height: 550px;
}

.quill-editor-full ::v-deep .ql-toolbar {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #ccc;
  background: #fafafa;
}

.ql-toolbar.ql-snow {
  display: none !important;
}
</style>

