document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const languageSelect = document.getElementById('language-select');
    const translateButton = document.getElementById('translate-button');

    const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY'; // Replace with your Google Cloud API key

    translateButton.addEventListener('click', () => {
        const text = inputText.value;
        const targetLanguage = languageSelect.value;

        if (text.trim() !== "") {
            translateText(text, targetLanguage)
                .then(translation => {
                    outputText.value = translation;
                })
                .catch(error => {
                    console.error('Error translating text:', error);
                    outputText.value = 'Error translating text';
                });
        } else {
            outputText.value = 'Please enter text to translate';
        }
    });

    async function translateText(text, targetLanguage) {
        const url = `https://translate.google.com/?sl=auto&tl=en&op=translate${API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                q: text,
                target: targetLanguage,
                format: 'text'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.data.translations[0].translatedText;
    }
});
