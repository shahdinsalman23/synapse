<template>
    <div :class="wrapperClass">
        <div class="clinical-practice-total">
            <h4>{{ title }}</h4>
            <div class="total-percentage-marks">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 20%;"></div>
                </div>
            <h5>{{ total }}</h5>
            </div>
        </div>
        <div v-for="(item, index) in items" :key="index" class="notes-list-item" @click="GOtoroute(item)">
            <h4>{{index +1}}. {{ item.title }}</h4>
            <h5>0/{{ item.questions_count ?? 0 }}</h5>

          

            
            
        </div>
    </div>
</template>



<script>
export default {
    props: {
        title: String,
        total: String,
        items: Array,
        wrapperClass: String,
        condition:String,
    },

    methods: {

        GOtoroute(item){
            if(this.condition == 'conditionAreas'){
                this.$emit('AreaCondition')

            }
            else{
                if(item && item.id) {
                    localStorage.setItem("notestitle", this.title);
                    this.$router.push(`/notespage/${item.id}`);
                } else {
                    localStorage.setItem("notestitle", this.title);
                    this.$router.push('/notespage/0');
                }
            }
        }
    }
}
</script>

<style scoped>

::-webkit-scrollbar {
    width: 3px;
    height: 20px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fade91;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #f5d469;
  }

  .areas-clinical-practice {
    height: 81vh;
    overflow-y: scroll;
}


.areas-presentation-condition{
   
    height: 81vh;
    overflow-y: scroll;
}
.list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.notes-list-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background: #FADE91;
    margin: 0px 0px 7px 0px;
    padding: 17px 14px 12px 20px;
    border-radius: 10px;
    cursor: pointer;
}

.notes-list-item:nth-child(even) {
    background: rgba(250, 222, 145, 0.55);
}

.notes-list-item h4 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}

.notes-list-item h5 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}


.progress-bar {
    background: #BBBDBF;
    border-radius: 20px;
    width: 60px;
    height: 6px;
    overflow: hidden;
    border: 1px solid #FFFFFF;
}

.progress-fill {
    background: #9DED6C;
    height: 100%;
}

.total-percentage-marks {
    display: flex;
    align-items: center;
    gap: 5px;
}

.clinical-practice-total {
   
    border: 0.75px solid #b07507;
    background: #FAAD1B;
   
}


</style>
