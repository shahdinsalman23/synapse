<template>
  <div>
    <NotesHeader :title="noteTitle" />

    <section class="notes-page-sec">
      <div class="container">
        <!-- Breadcrumb -->
        <div 
          class="breadcrumb-wrapper visible" 
        
        >
          <div class="breadcrumb">
            <span class="breadcrumb-item" 
              @click="goToNotesList">
              MLA CONTENT MAP
            </span>
            <span class="breadcrumb-arrow">›</span>
            <span class="breadcrumb-item active">
              {{ noteTitle }}
            </span>
          </div>
        </div>

        <!-- Editor Section -->
        <div class="notes-editor-container"
          @mouseenter="showBreadcrumb = true"
          @mouseleave="showBreadcrumb = false">
          <!-- <div class="editor-wrapper" v-html="editorContent"></div> -->
          <div class="editor-wrapper">
            <NotesEditor v-model="editorContent" />
          </div>
        </div>
        <div class="brake-border"></div>
        <NotesReviewDetail />
      </div>
    </section>
  </div>
</template>

<script>
import NotesHeader from '@/components/NotesHeader.vue';
import NotesEditor from '@/components/NotesEditor.vue';
import NotesReviewDetail from '@/components/NotesReviewDetail.vue';
import { get } from './lib/api';

export default {
  name: 'NotesPage',
  components: {
    NotesHeader,
    NotesEditor,
    NotesReviewDetail
  },
  data() {
    return {
      showBreadcrumb: false,
      loading: false,
      editorContent: '',
      noteTitle: ''
    };
  },
  created() {
    // Get the note title from localStorage (set in NotesSubList)
    this.noteTitle = localStorage.getItem('notestitle') || 'Notes';
    // Fetch note content from API based on route params
    const noteId = this.$route.params.id;
    const noteType = this.$route.query.type || localStorage.getItem('notestype') || 'notes';
    
    if (noteId) {
      this.fetchNoteContent(noteId, noteType);
    }
  },
  methods: {
    goToNotesList() {
      this.$router.push('/noteslistselection');
    },
    fetchNoteContent(noteId, type) {
      this.loading = true;
      
      // Call API with id and type parameters
      get('/getnotecontent', {
        id: noteId,
        type: type
      })
      .then((res) => {
        if (res.data && res.data.content) {
          this.editorContent = res.data.content?.content;
        } else {
          this.editorContent = '<p>No content available.</p>';
        }
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching note content:', error);
        this.editorContent = '<p>Error loading content. Please try again.</p>';
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>

.ql-toolbar.ql-snow {
  display: none !important;
}
.notes-page-sec {
  padding: 20px 0;
  min-height: calc(100vh - 200px);
}

.breadcrumb-wrapper {
  height: 30px;
  overflow: hidden;
  transition: all 0.6s ease;
  transform: translateY(-100%);
  opacity: 0;
  margin-bottom: 20px;
}

.breadcrumb-wrapper.visible {
  transform: translateY(0);
  opacity: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  padding: 20px 0;
  justify-content: center;
}

.breadcrumb-item {
  padding: 3px 10px;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 300;
  cursor: pointer;
  background: #BBBDBF;
}

.breadcrumb-item.active {
  background-color: #FADE91;
  color: #231F20;
}

.breadcrumb-item:hover {
  background-color: #FADE91;
  color: #231F20;
}

.breadcrumb-arrow {
  padding: 0 6px;
  color: #BBBDBF;
  font-size: 16px;
}

.notes-editor-container {
  width: 100%;
  min-height: calc(100vh - 300px);
}

.editor-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.editor-wrapper ul,
.editor-wrapper ol {
  text-align: left;     /* make list content align normally */
  display: inline-block; /* ensures list looks centered overall */
  list-style-position: inside !important;
}

@media (min-width: 1200px) {
  .container {
    max-width: 1220px;
  }
}
</style>

