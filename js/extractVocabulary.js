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
    var vocabularyCsvOutputList = [];
    textBoxes.forEach((element, index)=>{
        let dialoguePElements = element.getElementsByTagName("p");
        let strings = [];
        for (let i = 0; i < dialoguePElements.length; i++){
            let text = dialoguePElements[i].innerText;
            strings.push(text);
        }
        vocabularyList.push(`${strings[0]} [ ${strings[1]} ]    ${strings[2]}`);
        vocabularyCsvOutputList.push(`${strings[0]},${strings[1].replace(/,/g, ";")},${strings[2].replace(/,/g, ";")}`);
    })
    let vocabularyString = vocabularyList.join("\n");
    let vocabularyCsvString = vocabularyCsvOutputList.join("\n");
    console.log(vocabularyString);

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
    setTimeout(() => { copyToClip(vocabularyString) }, 500);
    
    // Save as txt
    let blob = new Blob([vocabularyString], { type: 'text/plain' });
    let aTag = document.createElement('a');
    aTag.href = URL.createObjectURL(blob);
    aTag.target = '_blank';
    let lessonNumber = location.href.split("/")[6].split(".html")[0]
    let pageLang = location.href.split("/")[4];
    let fileName = `${lessonNumber}-vocabulary_nhk-japanese-${pageLang}-conversation.txt`
    aTag.download = fileName;
    aTag.click();
    URL.revokeObjectURL(aTag.href);

    // Save as csv
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    blob = new Blob([bom, vocabularyCsvString], { type: 'text/csv' });
    aTag = document.createElement('a');
    aTag.href = URL.createObjectURL(blob);
    aTag.target = '_blank';
    fileName = `${lessonNumber}-vocabulary_nhk-japanese-${pageLang}-conversation.csv`
    aTag.download = fileName;
    aTag.click();
    URL.revokeObjectURL(aTag.href);
  }