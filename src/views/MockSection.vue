<template>
    <div>
        <section class="mocksection-pg">
            <div class="container">
                <div class="mock-container">
                    <div class="mock-card">
                        <div class="mock-image">
                            <img src="/images/mock1.png" alt="">
                            <attempt-progress-button />
                        </div>
                    </div>
                    <div class="mock-card">
                        <div class="mock-image">
                            <img src="/images/mock2.png" alt="">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                    <div class="mock-card">
                        <div class="mock-image">
                            <img src="/images/mock3.png" alt="">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                    <div class="mock-card">
                        <div class="mock-image">
                            <img src="/images/mock4.png" alt="">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                    <div class="mock-card">
                        <div class="mock-image">
                            <img src="/images/mock5.png" alt="">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>





<script>
import AttemptProgressButton from '@/components/AttemptProgressButton.vue';

export default {
    name: "MockSection",
    components: {
        AttemptProgressButton,
    }
};
</script>