<template>
    <div style="width:100%">
        <quill-editor
          v-model="editorContent"
          :options="editorOptions"
          style="height: 300px;  overflow-y: hidden;">
        </quill-editor>

      </div>

</template>




<script>

import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


export default {
    name: "TexteditorMock",
  components: {
    quillEditor,
  },
  data() {
    return {
      editorContent: '', // Bind this to your rich text content
      editorOptions: {
        theme: 'snow', // Other themes: 'bubble' or 'core'
        modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ color: [] }, { background: [] }],

        ],
      },
      },
    };
  },
};


</script>