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


</style>
