export const QUESTION_FEEDBACK_CATEGORIES = [
    { name: 'Condition', selectedOption: null },
    { name: 'Question', selectedOption: null },
    { name: 'Answer', selectedOption: null },
    { name: 'Explanation', selectedOption: null },
    { name: 'Incorrect options', selectedOption: null },
    { name: 'Notes', selectedOption: null },
    { name: 'Visual aid', selectedOption: null },
];

export const QUESTION_FEEDBACK_KEY_MAP = {
    Condition: 'condition',
    Question: 'question',
    Answer: 'answer',
    Explanation: 'explanation',
    'Incorrect options': 'incorrect_options',
    Notes: 'notes',
    'Visual aid': 'visual_aid',
};

export function createQuestionFeedbackCategories() {
    return QUESTION_FEEDBACK_CATEGORIES.map((cat) => ({
        name: cat.name,
        selectedOption: null,
    }));
}

export function hydrateQuestionFeedbackCategories(categories, feedback) {
    const fb = feedback && typeof feedback === 'object' ? feedback : null;

    return categories.map((cat) => {
        const key = QUESTION_FEEDBACK_KEY_MAP[cat.name];
        let selectedOption = fb && key && fb[key] ? fb[key] : null;

        if (!selectedOption && cat.name === 'Incorrect options' && fb?.rulling_out) {
            selectedOption = fb.rulling_out;
        }

        return { ...cat, selectedOption };
    });
}

export function buildQuestionFeedbackLocalState(selectedFeedback, optionfeedback) {
    const state = { optionfeedback, selectedFeedback };

    selectedFeedback.forEach(({ name, selectedOption }) => {
        const key = QUESTION_FEEDBACK_KEY_MAP[name];
        if (key) {
            state[key] = selectedOption;
        }
    });

    return state;
}
