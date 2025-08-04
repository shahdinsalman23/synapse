<template>
    <div :class="wrapperClass">
        <div class="clinical-practice-total">
            <h4>{{ title }}</h4>
            <h5>{{ total }}</h5>
        </div>
        <div v-for="(item, index) in items" :key="index" class="mla-list-item">
            <h4>{{ item.title }}</h4>
            <h5>{{ item.progress }}</h5>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        total: String,
        items: Array,
        wrapperClass: String
    }
}
</script>

<style scoped>
.list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.mla-list-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background: #D7EBFF;
    margin: 0px 0px 7px 0px;
    padding: 17px 14px 12px 20px;
    border-radius: 10px;
}

.mla-list-item h4 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}

.mla-list-item h5 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}


</style>
