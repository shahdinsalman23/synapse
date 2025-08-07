<template>
    <div>
        <QuestionHeader />


         <section class="question-breadcrum">
            <div class="container">
                <!-- 🔹 Breadcrumb -->
                <div class="breadcrumb">
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'MLA CONTENT MAP' }"
                        @click="activeSection = 'MLA CONTENT MAP'">
                        MLA CONTENT MAP
                    </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                            @click="activeSection = 'BY AREAS'">
                            PRESENTATIONS AND CONDITIONS
                        </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                            @click="activeSection = 'BY AREAS'">
                            BY AREAS
                        </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                            @click="activeSection = 'BY AREAS'">
                            CARDIOLOGY
                        </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                            @click="activeSection = 'BY AREAS'">
                            PRESENTATIONS
                        </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                            @click="activeSection = 'BY AREAS'">
                            ABDOMINAL MASS
                        </span>
                </div>
            </div>
        </section>



        <section class="mockbirdseye-sec">
            <div class="container">
                <div class="birdsaeye-head">
                    <h6>Bird's Eye View</h6>
                </div>
                <div class="mockbirdseye-wrapper">
                <div class="mockbirdseye-boxes">
                    <h4 v-for="index in 200" :key="index">
                        <span class="box-number">{{ index }}</span>
                    </h4>
                </div>
                </div>
                <div class="mockbird-submitbtn">
                    <button>Return</button>
                    <div class="cardbottom-shadow">
                        <img src="/images/cardshadow.png" alt="">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import QuestionHeader from '@/components/QuestionHeader.vue';

export default {
    name: "MockBirdsEye",
    components: {
        QuestionHeader,
    },
}
</script>

<style scoped>
.mockbirdseye-sec {
    padding: 20px 0;
}

.birdsaeye-head {
    padding: 12px 0px 20px 0px;
}

.birdsaeye-head h6 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
    background-color: #1A90FF;
}

.mockbirdseye-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
}

.mockbirdseye-boxes {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    width: 100%;
    overflow-x: auto;
    overflow-y: scroll;
    height: 570px;
    padding: 0px 10px 0px 0px;
    scrollbar-width: thin;       
    scrollbar-color: #ccc transparent;
}

.mockbirdseye-boxes::-webkit-scrollbar {
    width: 6px;
}

.mockbirdseye-boxes::-webkit-scrollbar-track {
    background: transparent;
}

.mockbirdseye-boxes::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
}

.mockbirdseye-boxes::-webkit-scrollbar-button {
    display: none; 
}


.mockbirdseye-boxes h4 {
    margin: 0;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 49px;
    background: #f1f2f2;
    border-radius: 8px;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    font-family: Helveticacondensed;
}

.box-number {
    display: block;
    width: 100%;
}

.breadcrumb {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 0 0 0;
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
    background-color: #1A90FF;
}

.breadcrumb-item.inactive {
    background-color: #BBBDBF;
}

.breadcrumb-arrow {
    padding: 0 6px;
    color: #BBBDBF;
    font-size: 16px;
}


.birdsaeye-head {
    margin-top: 0px;
}

.mockbird-submitbtn {
    padding: 43px 0px 53px 0px;
}


@media (max-width: 768px) {
    .mockbirdseye-boxes {
        grid-template-columns: repeat(10, 1fr);
    }

    .mockbirdseye-boxes h4 {
        height: 35px;
        font-size: 12px;
    }
}
</style>
