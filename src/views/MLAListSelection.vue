<template>
<div>
  <QuestionHeader />

  <section class="mla-list-sec">
    <div class="container">

      <!-- 🔹 Breadcrumb -->
      <div 
      class="breadcrumb-wrapper" 
      :class="{ visible: showBreadcrumb }"
    >
      <div class="breadcrumb" >
        <span class="breadcrumb-item" :class="{ active: activeSection === 'MLA CONTENT MAP' }"
          @click="activeSection = 'MLA CONTENT MAP'">
          MLA CONTENT MAP
        </span>
        <span class="breadcrumb-arrow" v-if="showAreaBreadcrumbs">›</span>

        <!-- BY AREAS + BY CONDITIONS (only when showAreaBreadcrumbs is true) -->
        <template v-if="showAreaBreadcrumbs">
          <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
            @click="activeSection = 'BY AREAS'">
            BY AREAS
          </span>
          <!-- <span class="breadcrumb-arrow">›</span>
          <span class="breadcrumb-item" :class="{ active: activeSection === 'BY CONDITIONS' }"
            @click="activeSection = 'BY CONDITIONS'">
            BY CONDITIONS
          </span> -->
        </template>

        <!-- PRESENTATIONS AND CONDITIONS + ALPHABETICALLY (only when showPresentationBreadcrumbs is true) -->
        <template v-if="showPresentationBreadcrumbs">
          <span class="breadcrumb-arrow">›</span>
          <span class="breadcrumb-item" :class="{ active: activeSection === 'PRESENTATIONS AND CONDITIONS' }"
            @click="activeSection = 'PRESENTATIONS AND CONDITIONS'">
            PRESENTATIONS AND CONDITIONS
          </span>
          <span class="breadcrumb-arrow">›</span>
          <span v-if="activeSection === 'ALPHABETICALLY'" class="breadcrumb-item" :class="{ active: activeSection === 'ALPHABETICALLY' }"
            @click="activeSection = 'ALPHABETICALLY'">
            ALPHABETICALLY
          </span>

          <span v-if="activeSection === 'BY AREAS PRESENTATION'" class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS PRESENTATION' && activeSubSection == '' }"
          @click="activeSection = 'BY AREAS PRESENTATION'">
          BY AREAS
        </span>
        <span v-if="activeSection === 'BY AREAS PRESENTATION' && activeSubSection == 'ByAreaCondition'" class="breadcrumb-arrow">›</span>
        <span v-if="activeSection === 'BY AREAS PRESENTATION' && activeSubSection == 'ByAreaCondition'" class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS PRESENTATION' }"
        @click="activeSection = 'BY AREAS PRESENTATION'">
        Abdominal distension
      </span>
        </template>
      </div>
      </div>

      <!-- 🔹 Content -->
      <div class="mla-list-layout">
        <div class="mlalist-left-section">
          <div  @mouseenter="showBreadcrumb = true"
          @mouseleave="showBreadcrumb = false">
          <MLAContentMap  :viewMode="viewMode" @set-view-mode="setViewMode"  @sort-changed="handleSortChange"  @update-active-section="activeSection = $event"/>
          <div class="mla-content-searchbar">
            <input type="search" v-model="searchQuery" id="search" placeholder="Search..." name="search" />
            <div class="search-mla-icon">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.14941 5.6517C2.14941 8.3617 4.30942 10.5417 6.96942 10.5417C9.62942 10.5417 11.7894 8.3517 11.7894 5.6517C11.7894 2.9517 9.62942 0.761719 6.96942 0.761719C4.29942 0.761719 2.14941 2.9417 2.14941 5.6517ZM3.61942 5.6517C3.61942 3.7717 5.09942 2.25171 6.96942 2.25171C8.81942 2.25171 10.3194 3.79171 10.3194 5.66171C10.3194 7.53171 8.80942 9.06171 6.96942 9.06171C5.12942 9.06171 3.61942 7.5217 3.61942 5.6517Z"
                  fill="url(#paint0_linear_3101_1026)" />
                <path
                  d="M0.849842 12.8624C0.489842 12.5224 0.479824 11.9824 0.799824 11.6324L3.68984 8.45239C4.01984 8.09239 4.55983 8.07238 4.89983 8.40238C5.25983 8.74238 5.27985 9.28239 4.94985 9.63239L2.05983 12.8124C1.88983 12.9924 1.64983 13.0824 1.42983 13.0824C1.20983 13.0824 1.00983 12.9924 0.839832 12.8624H0.849842Z"
                  fill="url(#paint1_linear_3101_1026)" />
                <defs>
                  <linearGradient id="paint0_linear_3101_1026" x1="12.4194" y1="-0.338281" x2="0.559433" y2="12.6617"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8AD9FF" />
                    <stop offset="1" stop-color="#115FFF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_3101_1026" x1="12.6699" y1="-0.107589" x2="0.809896" y2="12.8924"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8AD9FF" />
                    <stop offset="1" stop-color="#115FFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          </div>
          <div>
          <div class="questions-notes-mocks">
            <div class="mla-question-box">
              <h4><img src="/images/questionmark.png" alt="img"> Questions</h4>
               <ProgressBar :progress="0" />
               <div class="cardbottom-shadow">
                        <img src="/images/cardshadow.png" alt="">
                    </div>
            </div>
            <div class="mla-question-box mla-note-box">
              <h4><img src="/images/file.png" alt="img"> Notes</h4>
               <ProgressBar :progress="38" />
               <div class="cardbottom-shadow">
                        <img src="/images/cardshadow.png" alt="">
                    </div>
            </div>
            <div class="mla-question-box mla-mock-box">
              <h4><img src="/images/brain.png" alt="img"> Mocks</h4>
               <ProgressBar :progress="66"  label="Score"/>
               <div class="cardbottom-shadow">
                        <img src="/images/cardshadow.png" alt="">
                    </div>
            </div>
          </div>
          </div>
        </div>

        <div class="mlalist-right-section">
          <!-- 🧠 Dynamic Content based on breadcrumb -->
          <template v-if="activeSection === 'MLA CONTENT MAP'"></template>
          <template v-if="activeSection === 'BY AREAS'" >
            <div class="listing"
            @mouseenter="showBreadcrumb = true"
            @mouseleave="showBreadcrumb = false">

           
            <MLASubList title="All areas of clinical practice" total="0/1750" :items="clinicalAreas"
              wrapperClass="areas-clinical-practice" />
            <MLASubList title="All areas of professional knowledge" total="0/887" :items="professionalKnowledge"
              wrapperClass="areas-professional-knowledge" />
            </div>
          </template>

          <template v-else-if="activeSection === 'BY CONDITIONS'">
            <MLAList title="Conditions List (Example)" total="0/1200" :items="conditionsList"
              wrapperClass="full-width-list" />
          </template>
          <template v-if="activeSection === 'PRESENTATIONS AND CONDITIONS'"></template>
          <template v-if="activeSection === 'ALPHABETICALLY'">
            <div class="listing"
            @mouseenter="showBreadcrumb = true"
            @mouseleave="showBreadcrumb = false">
            <MLAList title="Presentations" total="0/974" :items="PresentationsList"
              wrapperClass="areas-clinical-practice" />
            <MLASubList title="Conditions" total="0/1140" :items="AlphaConditionsList"
            wrapperClass="areas-professional-knowledge" />
            </div>
          </template>

          <template v-if="activeSection === 'BY AREAS PRESENTATION' && activeSubSection == ''">
            <div class="listing"
            @mouseenter="showBreadcrumb = true"
            @mouseleave="showBreadcrumb = false">
            <MLAList title="Presentations / Condition" total="0/974" :items="presentationcondition"
              wrapperClass="areas-presentation-condition" condition="conditionAreas" @AreaCondition="AreaCondition" />
            </div>
            
          </template>

          <template v-if="activeSection === 'BY AREAS PRESENTATION' && activeSubSection == 'ByAreaCondition'">
            <div class="listing"
            @mouseenter="showBreadcrumb = true"
            @mouseleave="showBreadcrumb = false">
            <MLAList title="Presentations" total="0/974" :items="PresentationsList"
              wrapperClass="areas-clinical-practice" />
            <MLASubList title="Conditions" total="0/1140" :items="AlphaConditionsList"
            wrapperClass="areas-professional-knowledge" />
            </div>
          </template>

          
        </div>
      </div>
    </div>
  </section>
  
  </div>
</template>

<script>
import QuestionHeader from '@/components/QuestionHeader.vue';
import MLAContentMap from '@/components/MLAContentMap.vue'
import MLAList from '@/components/MLAList.vue'
import MLASubList from '@/components/MLASubList.vue'

import ProgressBar from '@/components/QuestionpgProgress.vue'

export default {
  name: 'MLAListSelection',
  components: {
    QuestionHeader,
    MLAContentMap,
    ProgressBar, 
    MLAList,
    MLASubList
  },
  data() {
    return {
      searchQuery: '',
      activeSection: 'BY AREAS',
      activeSubSection: '',
      viewMode: 'areas',
      showBreadcrumb:false,
      clinicalAreas: [
        // { title: '1. Acute and emergency', progress: '0/134' },
        {
    title: '1. Acute and emergency',
    progress: '0/134',
    children: [
      {
        title: 'Acid-base abnormality',
        questions: [1, 2, 3, 4, 5]
      },
      {
        title: 'Acute bronchitis',
        questions: [6, 7]
      },
      {
        title: 'Acute coronary syndromes',
        children: [
          { title: 'STEMI', questions: [8] },
          { title: 'NSTEMI', questions: [9, 10, 11] }
        ]
      },
      {
        title: 'Acute kidney injury',
        children: [
          { title: 'Acute kidney injury', questions: [12] },
          { title: 'Rhabdomyolysis', questions: [13] },
          { title: 'Acute interstitial nephritis', questions: [14] },
          { title: 'Hemolytic uremic syndrome', questions: [15] }
        ]
      },
      {
        title: 'Allergic disorder',
        children: [
          { title: 'Anaphylaxis', questions: [16] },
          { title: 'Contact dermatitis', questions: [17] },
          { title: 'Food allergy', questions: [18] },
          { title: 'Urticaria', questions: [19] }
        ]
      },
      {
        title: 'Anaphylaxis',
        questions: [20, 21]
      },
      {
        title: 'Aortic aneurysm',
        questions: [22, 23]
      },
      {
        title: 'Arrhythmias',
        children: [
          { title: 'Atrial fibrillation', questions: [24] },
          { title: 'Heart block', questions: [25] },
          { title: 'Long QT syndrome', questions: [26] },
          { title: 'Supraventricular tachycardia', questions: [27] }
        ]
      },
      {
        title: 'Cardiac arrest',
        questions: [28, 29]
      },
      {
        title: 'Cardiac failure',
        questions: [30, 31]
      },
      {
        title: 'Chronic obstructive pulmonary disease',
        questions: [32, 33]
      },
      {
        title: 'Compartment syndrome',
        questions: [34, 35]
      },
      {
        title: 'Deep vein thrombosis',
        questions: [36, 37]
      },
      {
        title: 'Dehydration',
        questions: [38, 39]
      },
      {
        title: 'Diabetic ketoacidosis',
        questions: [40, 41]
      },
      {
        title: 'Drug overdose',
        children: [
          { title: 'Aspirin', questions: [42] },
          { title: 'Cocaine', questions: [43] },
          { title: 'Lithium', questions: [44] },
          { title: 'MDMA', questions: [45] },
          { title: 'Neuroleptic malignant syndrome', questions: [46] },
          { title: 'Opioid overdose and withdrawal', questions: [47] },
          { title: 'Paracetamol overdose and withdrawal', questions: [48] },
          { title: 'Serotonin syndrome', questions: [49] },
          { title: 'TCA', questions: [50] }
        ]
      },
      {
        title: 'Ectopic pregnancy',
        questions: [51, 52]
      },
      {
        title: 'Epilepsy',
        children: [
          { title: 'Epilepsy', questions: [53] },
          { title: 'Infantile spasm', questions: [54] },
          { title: 'Non-epileptic attack disorder', questions: [55] }
        ]
      },
      {
        title: 'Epistaxis',
        questions: [56, 57]
      },
      {
        title: 'Extradural haemorrhage',
        questions: [58, 59]
      },
      {
        title: 'Gastrointestinal perforation',
        children: [
          { title: 'Oesophageal perforation', questions: [60] }
        ]
      },
      {
        title: 'Haemoglobinopathies',
        children: [
          { title: 'Thalassaemia', questions: [61, 62] },
          { title: 'Sickle cell disease', questions: [63] }
        ]
      },
      {
        title: 'Hyperosmolar hyperglycaemic state',
        questions: [64, 65]
      },
      {
        title: 'Hyperthermia and hypothermia',
        children: [
          { title: 'Hypothermia', questions: [66] },
          { title: 'Malignant hyperthermia', questions: [67] }
        ]
      },
      {
        title: 'Meningitis',
        questions: [68, 69]
      },
      {
        title: 'Myocardial infarction',
        questions: [70, 71]
      },
      {
        title: 'Necrotising fasciitis',
        questions: [72, 73]
      },
      {
        title: 'Non-accidental injury',
        children: [
          { title: 'Child abuse', questions: [74] },
          { title: 'Adult abuse', questions: [75] }
        ]
      },
      {
        title: 'Pancytopenia',
        questions: [76, 77]
      },
      {
        title: 'Pneumonia',
        questions: [78, 79]
      },
      {
        title: 'Pneumothorax',
        questions: [80, 81]
      },
      {
        title: 'Postpartum haemorrhage',
        questions: [82, 83]
      },
      {
        title: 'Pulmonary embolism',
        questions: [84, 85]
      },
      {
        title: 'Raised intracranial pressure',
        questions: [86, 87]
      },
      {
        title: 'Respiratory arrest',
        children: [
          { title: 'Adult', questions: [88] },
          { title: 'Child', questions: [89] }
        ]
      },
      {
        title: 'Respiratory failure',
        children: [
          { title: 'Respiratory failure', questions: [90] },
          { title: 'Carbon monoxide poisoning', questions: [91] }
        ]
      },
      {
        title: 'Self-harm',
        questions: [92, 93]
      },
      {
        title: 'Sepsis',
        questions: [94, 95]
      },
      {
        title: 'Spinal cord compression',
        questions: [96, 97]
      },
      {
        title: 'Spinal cord injury',
        questions: [98, 99]
      },
      {
        title: 'Stroke',
        questions: [100, 101]
      },
      {
        title: 'Subarachnoid haemorrhage',
        questions: [102, 103]
      },
      {
        title: 'Subdural haemorrhage',
        questions: [104, 105]
      },
      {
        title: 'Substance use disorder',
        questions: [106, 107]
      },
      {
        title: 'Testicular torsion',
        questions: [108, 109]
      },
      {
        title: 'Toxic shock syndrome',
        questions: [110, 111]
      },
      {
        title: 'Transfusion reactions',
        questions: [114, 115]
      },
      {
        title: 'Unstable angina',
        questions: [116, 117]
      }
    ]
  },
        { title: '2. Cancer', progress: '0/45' },
        { title: '3. Cardiovascular', progress: '0/143' },
        { title: '4. Childhealth', progress: '0/54' },
        { title: '5. Clinical haematology', progress: '0/110' },
        { title: '6. Clinical imaging', progress: '0/45' },
        { title: '7. Dermatology', progress: '0/80' },
        { title: '8. Ear, nose and throat', progress: '0/78' },
        { title: '9. Endocrine and metabolic', progress: '0/84' },
        { title: '10. Gastrointestinal including liver', progress: '0/102' },
        { title: '11. General practice and primary healthcare', progress: '0/200' },
        { title: '12. Infection', progress: '0/102' },
      ],
      professionalKnowledge: [
        { title: '1. Allergy and immunology', progress: '0/134' },
        { title: '2. Biomedical sciences', progress: '0/80' },
        { title: '3. Clinical biochemistry', progress: '0/45' },
        { title: '4. Clinical pharmacology and therapeutics', progress: '0/60' },
        { title: '5. Genetics and genomics', progress: '0/35' },
        { title: '6. Histopathology', progress: '0/45' },
        { title: '7. Human factors and quality improvement', progress: '0/30' },
        { title: '8. Laboratory haematology', progress: '0/40' },
        { title: '9. Medical ethics and law', progress: '0/102' },
        { title: '10. Microbiology', progress: '0/40' },
        { title: '11. Psychological principles', progress: '0/200' },
        { title: '12. Social and population health', progress: '0/30' },
      ],
      conditionsList: [
        { title: '1. Diabetes', progress: '0/200' },
        { title: '2. Hypertension', progress: '0/150' }
      ],
      PresentationsList: [
        { title: '1. Abdominal distension', progress: '0/10' },
        { title: '2. Abdominal mass', progress: '0/56' },
        { title: '3. Abnormal cervical smear result', progress: '0/14' },
        { title: '4. Abnormal development/developmental delay', progress: '0/20' },
        { title: '5. Abnormal eating or exercising behavior', progress: '0/13' },
        { title: '6. Abnormal involuntary movements', progress: '0/13' },
        { title: '7. Abnormal urinalysis', progress: '0/18' },
        { title: '8. Acute abdominal pain', progress: '0/20' },
        { title: '9. Acute and chronic pain management', progress: '0/60' },
        { title: '10. Acute change in or loss of vision', progress: '0/10' },
        { title: '11. Acute joint pain/swelling', progress: '0/20' },
        { title: '12. Acute kidney injury', progress: '0/15' },
      ],
      AlphaConditionsList: [
        { title: '1. Acid-base abnormality', progress: '0/12',
        children: [
     
      {
        title: 'Acute bronchitis',
        questions: [6, 7]
      },
      {
        title: 'Acute coronary syndromes',
        
      },
      {
        title: 'Acute kidney injury',
       
      },
      {
        title: 'Allergic disorder',
        
      },
      {
        title: 'Anaphylaxis',
        questions: [20, 21]
      },
      {
        title: 'Aortic aneurysm',
        questions: [22, 23]
      },
      {
        title: 'Arrhythmias',
       
      },
      {
        title: 'Cardiac arrest',
        questions: [28, 29]
      },
      {
        title: 'Cardiac failure',
        questions: [30, 31]
      },
      {
        title: 'Chronic obstructive pulmonary disease',
        questions: [32, 33]
      },
      {
        title: 'Compartment syndrome',
        questions: [34, 35]
      },
      {
        title: 'Deep vein thrombosis',
        questions: [36, 37]
      },
      {
        title: 'Dehydration',
        questions: [38, 39]
      },
      {
        title: 'Diabetic ketoacidosis',
        questions: [40, 41]
      },
      {
        title: 'Drug overdose',
       
      },
      {
        title: 'Ectopic pregnancy',
        questions: [51, 52]
      },
      {
        title: 'Epilepsy',
        
      },
      {
        title: 'Epistaxis',
        questions: [56, 57]
      },
      {
        title: 'Extradural haemorrhage',
        questions: [58, 59]
      },
      {
        title: 'Gastrointestinal perforation',
       
      },
      {
        title: 'Haemoglobinopathies',
       
      },
      {
        title: 'Hyperosmolar hyperglycaemic state',
        questions: [64, 65]
      },
      {
        title: 'Hyperthermia and hypothermia',
       
      },
      {
        title: 'Meningitis',
        questions: [68, 69]
      },
      {
        title: 'Myocardial infarction',
        questions: [70, 71]
      },
      {
        title: 'Necrotising fasciitis',
        questions: [72, 73]
      },
      {
        title: 'Non-accidental injury',
       
      },
      {
        title: 'Pancytopenia',
        questions: [76, 77]
      },
      {
        title: 'Pneumonia',
        questions: [78, 79]
      },
      {
        title: 'Pneumothorax',
        questions: [80, 81]
      },
      {
        title: 'Postpartum haemorrhage',
        questions: [82, 83]
      },
      {
        title: 'Pulmonary embolism',
        questions: [84, 85]
      },
      {
        title: 'Raised intracranial pressure',
        questions: [86, 87]
      },
      {
        title: 'Respiratory arrest',
        
      },
      {
        title: 'Respiratory failure',
        
      },
      {
        title: 'Self-harm',
        questions: [92, 93]
      },
      {
        title: 'Sepsis',
        questions: [94, 95]
      },
      {
        title: 'Spinal cord compression',
        questions: [96, 97]
      },
      {
        title: 'Spinal cord injury',
        questions: [98, 99]
      },
      {
        title: 'Stroke',
        questions: [100, 101]
      },
      {
        title: 'Subarachnoid haemorrhage',
        questions: [102, 103]
      },
      {
        title: 'Subdural haemorrhage',
        questions: [104, 105]
      },
      {
        title: 'Substance use disorder',
        questions: [106, 107]
      },
      {
        title: 'Testicular torsion',
        questions: [108, 109]
      },
      {
        title: 'Toxic shock syndrome',
        questions: [110, 111]
      },
      {
        title: 'Transfusion reactions',
        questions: [114, 115]
      },
      {
        title: 'Unstable angina',
        questions: [116, 117]
      }
    ]
         },
        { title: '2. Acne vulgaris', progress: '0/14' },
        { title: '3. Acoustic neuroma', progress: '0/8' },
        { title: '4. Acute bronchitis', progress: '0/8' },
        { title: '5. Acute cholangitis', progress: '0/6' },
        { title: '6. Acute coronary syndromes', progress: '0/14' },
        { title: '7. Acute glaucoma', progress: '0/6' },
        { title: '8. Acute kidney injury ', progress: '0/20' },
        { title: '9. Acute pancreatitis', progress: '0/12' },
        { title: '10. Acute stress reaction', progress: '0/6' },
        { title: '11. Addisons disease', progress: '0/12' },
        { title: '12. Adverse drug effects', progress: '0/38' },
        
      ],

      presentationcondition: [
       
        {
    title: '1. Acute and emergency',
    progress: '0/134',
    children: [
      {
        title: 'Acid-base abnormality',
        questions: [1, 2, 3, 4, 5]
      },
      {
        title: 'Acute bronchitis',
        questions: [6, 7]
      },
      {
        title: 'Acute coronary syndromes',
        children: [
          { title: 'STEMI', questions: [8] },
          { title: 'NSTEMI', questions: [9, 10, 11] }
        ]
      },
      {
        title: 'Acute kidney injury',
        children: [
          { title: 'Acute kidney injury', questions: [12] },
          { title: 'Rhabdomyolysis', questions: [13] },
          { title: 'Acute interstitial nephritis', questions: [14] },
          { title: 'Hemolytic uremic syndrome', questions: [15] }
        ]
      },
      {
        title: 'Allergic disorder',
        children: [
          { title: 'Anaphylaxis', questions: [16] },
          { title: 'Contact dermatitis', questions: [17] },
          { title: 'Food allergy', questions: [18] },
          { title: 'Urticaria', questions: [19] }
        ]
      },
      {
        title: 'Anaphylaxis',
        questions: [20, 21]
      },
      {
        title: 'Aortic aneurysm',
        questions: [22, 23]
      },
      {
        title: 'Arrhythmias',
        children: [
          { title: 'Atrial fibrillation', questions: [24] },
          { title: 'Heart block', questions: [25] },
          { title: 'Long QT syndrome', questions: [26] },
          { title: 'Supraventricular tachycardia', questions: [27] }
        ]
      },
      {
        title: 'Cardiac arrest',
        questions: [28, 29]
      },
      {
        title: 'Cardiac failure',
        questions: [30, 31]
      },
      {
        title: 'Chronic obstructive pulmonary disease',
        questions: [32, 33]
      },
      {
        title: 'Compartment syndrome',
        questions: [34, 35]
      },
      {
        title: 'Deep vein thrombosis',
        questions: [36, 37]
      },
      {
        title: 'Dehydration',
        questions: [38, 39]
      },
      {
        title: 'Diabetic ketoacidosis',
        questions: [40, 41]
      },
      {
        title: 'Drug overdose',
        children: [
          { title: 'Aspirin', questions: [42] },
          { title: 'Cocaine', questions: [43] },
          { title: 'Lithium', questions: [44] },
          { title: 'MDMA', questions: [45] },
          { title: 'Neuroleptic malignant syndrome', questions: [46] },
          { title: 'Opioid overdose and withdrawal', questions: [47] },
          { title: 'Paracetamol overdose and withdrawal', questions: [48] },
          { title: 'Serotonin syndrome', questions: [49] },
          { title: 'TCA', questions: [50] }
        ]
      },
      {
        title: 'Ectopic pregnancy',
        questions: [51, 52]
      },
      {
        title: 'Epilepsy',
        children: [
          { title: 'Epilepsy', questions: [53] },
          { title: 'Infantile spasm', questions: [54] },
          { title: 'Non-epileptic attack disorder', questions: [55] }
        ]
      },
      {
        title: 'Epistaxis',
        questions: [56, 57]
      },
      {
        title: 'Extradural haemorrhage',
        questions: [58, 59]
      },
      {
        title: 'Gastrointestinal perforation',
        children: [
          { title: 'Oesophageal perforation', questions: [60] }
        ]
      },
      {
        title: 'Haemoglobinopathies',
        children: [
          { title: 'Thalassaemia', questions: [61, 62] },
          { title: 'Sickle cell disease', questions: [63] }
        ]
      },
      {
        title: 'Hyperosmolar hyperglycaemic state',
        questions: [64, 65]
      },
      {
        title: 'Hyperthermia and hypothermia',
        children: [
          { title: 'Hypothermia', questions: [66] },
          { title: 'Malignant hyperthermia', questions: [67] }
        ]
      },
      {
        title: 'Meningitis',
        questions: [68, 69]
      },
      {
        title: 'Myocardial infarction',
        questions: [70, 71]
      },
      {
        title: 'Necrotising fasciitis',
        questions: [72, 73]
      },
      {
        title: 'Non-accidental injury',
        children: [
          { title: 'Child abuse', questions: [74] },
          { title: 'Adult abuse', questions: [75] }
        ]
      },
      {
        title: 'Pancytopenia',
        questions: [76, 77]
      },
      {
        title: 'Pneumonia',
        questions: [78, 79]
      },
      {
        title: 'Pneumothorax',
        questions: [80, 81]
      },
      {
        title: 'Postpartum haemorrhage',
        questions: [82, 83]
      },
      {
        title: 'Pulmonary embolism',
        questions: [84, 85]
      },
      {
        title: 'Raised intracranial pressure',
        questions: [86, 87]
      },
      {
        title: 'Respiratory arrest',
        children: [
          { title: 'Adult', questions: [88] },
          { title: 'Child', questions: [89] }
        ]
      },
      {
        title: 'Respiratory failure',
        children: [
          { title: 'Respiratory failure', questions: [90] },
          { title: 'Carbon monoxide poisoning', questions: [91] }
        ]
      },
      {
        title: 'Self-harm',
        questions: [92, 93]
      },
      {
        title: 'Sepsis',
        questions: [94, 95]
      },
      {
        title: 'Spinal cord compression',
        questions: [96, 97]
      },
      {
        title: 'Spinal cord injury',
        questions: [98, 99]
      },
      {
        title: 'Stroke',
        questions: [100, 101]
      },
      {
        title: 'Subarachnoid haemorrhage',
        questions: [102, 103]
      },
      {
        title: 'Subdural haemorrhage',
        questions: [104, 105]
      },
      {
        title: 'Substance use disorder',
        questions: [106, 107]
      },
      {
        title: 'Testicular torsion',
        questions: [108, 109]
      },
      {
        title: 'Toxic shock syndrome',
        questions: [110, 111]
      },
      {
        title: 'Transfusion reactions',
        questions: [114, 115]
      },
      {
        title: 'Unstable angina',
        questions: [116, 117]
      }
    ]
  },
        { title: '2. Cancer', progress: '0/45' },
        { title: '3. Cardiovascular', progress: '0/143' },
        { title: '4. Childhealth', progress: '0/54' },
        { title: '5. Clinical haematology', progress: '0/110' },
        { title: '6. Clinical imaging', progress: '0/45' },
        { title: '7. Dermatology', progress: '0/80' },
        { title: '8. Ear, nose and throat', progress: '0/78' },
        { title: '9. Endocrine and metabolic', progress: '0/84' },
        { title: '10. Gastrointestinal including liver', progress: '0/102' },
        { title: '11. General practice and primary healthcare', progress: '0/200' },
        { title: '12. Infection', progress: '0/102' },
        { title: '13. Medicine of older adult', progress: '0/102' },
        { title: '14. Mental health', progress: '0/102' },
        { title: '15. Musculoskeletal', progress: '0/102' },
        { title: '16. Nerusciences', progress: '0/102' },
        { title: '17. Obsetetrics and gynaecology', progress: '0/102' },
        { title: '18. Opthalmology', progress: '0/102' },
        { title: '19. Palliative and end of life care', progress: '0/102' },
        { title: '20. Perioperative medicine and anaesthesia', progress: '0/102' },
        { title: '21. Renal and Urlology', progress: '0/102' },
        { title: '22. Respiratory', progress: '0/102' },
        { title: '23. Sexual Health', progress: '0/102' },
        { title: '24. Surgery', progress: '0/102' },
        { title: '24. All areas and clinical practice', progress: '0/102' },













      ],

      
    };
  },
  computed: {
    showAreaBreadcrumbs() {
      return this.viewMode === 'areas';
    },
    showPresentationBreadcrumbs() {
      return this.viewMode === 'presentations';
    }
  },
  methods: {

    

    AreaCondition(){
      this.activeSubSection = 'ByAreaCondition'
    },
    setViewMode(mode) {
      this.viewMode = mode;
      console.log('mode' , mode)
      // Set the default tab shown when switching
      // this.activeSection = 'MLA CONTENT MAP';
      if(mode == 'areas'){
        this.activeSection = 'BY AREAS';
      }
      else{

        this.activeSection = 'ALPHABETICALLY';
      }
    },
     handleSortChange(option) {
    if (option === 'alphabetically') {  
      this.activeSection = 'ALPHABETICALLY';
    } else if (option === 'byareas') {
      this.activeSection = 'BY AREAS PRESENTATION';
       this.activeSubSection = ''
    }
  }
  },
  
}
</script>

<style scoped>

.breadcrumb-wrapper {
  height: 40px; /* your breadcrumb height */
  overflow: hidden;
  transition: all 0.6s ease;
  transform: translateY(-100%);
  opacity: 0;
}

/* When visible, slide down smoothly */
.breadcrumb-wrapper.visible {
  transform: translateY(0);
  opacity: 1;
}

/* Breadcrumb content style */
.breadcrumb {
  display: flex;
  align-items: center;
  height: 40px;
}


.listing {
  width: 100%;
  display: flex;
  gap: 20px;
}

.areas-presentation-condition{
  width: 100%;
  border: 0.75px solid #D0D2D3;
  padding: 13px 10px;
  border-radius: 20px;
}
.breadcrumb {
  display: flex;
  align-items: center;
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

.mla-question-box {
    background: #1A90FF;
    border: 1px solid #0276BA;
    margin: 30px 0px 0px 0px;
    padding: 8px 10px 8px 10px;
    border-radius: 20px;
    position: relative;
}

.mla-question-box .cardbottom-shadow img {
    left: 50%;
    transform: translate(-50%);
    bottom: -27px;
    width: 350px;
}

.mla-question-box h4 {
    font-size: 27px;
    color: #fff;
    text-transform: uppercase;
    padding: 0px 0px 10px 0px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
}

.mla-question-box h4 img {
    width: 30px;
    height: 30px;
}


.mla-note-box {
 background-color: #F59C00;
 border-color: #F59C00;
}

.mla-mock-box {
  background-color: #ED1C24;
  border-color: #ED1C24;
}


@media (min-width: 1200px) {
      .container {
        max-width: 1220px;
    }
}



</style>
