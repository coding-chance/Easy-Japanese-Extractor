let extractVocabularyButton = document.getElementById("extractVocabularyButton");
extractVocabularyButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractVocabulary,
    });
});

function extractVocabulary() {
    let vocabularySection = document.getElementById("vocabulary");
    let textBoxes = vocabularySection.querySelectorAll(".text-box");
    var vocabularyList = [];
    textBoxes.forEach((element, index)=>{
        let dialoguePElements = element.getElementsByTagName("p");
        let strings = [];
        for (let i = 0; i < dialoguePElements.length; i++){
            let text = dialoguePElements[i].innerText;
            strings.push(text);
        }
        vocabularyList.push(`${strings[0]} [ ${strings[1]} ]    ${strings[2]}`);
    })
    let vocabularyString = vocabularyList.join("\n");
    const copyToClip = async (vocabularyString) => {
      try {
        await navigator.clipboard.writeText(vocabularyString);
        alert('Vocabulary copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy vocabulary to clipboard. Check console on your browser.');
      }
    }
    
    alert("Turn off the extension pop-up. \n(Click anywhere on the page body to disable the pop-up)")
    setTimeout(() => { copyToClip(vocabularyString) }, 500)
    
  }