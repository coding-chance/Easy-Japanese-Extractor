let extractDialogueButton = document.getElementById("extractDialogueButton");
extractDialogueButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractDialogue,
    });
});


let extractVocabularyButton = document.getElementById("extractVocabularyButton");
extractVocabularyButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractVocabulary,
    });
});


function extractDialogue() {
  let dialogueSection = document.getElementById("skit");
  let textBoxes = dialogueSection.querySelectorAll(".text-box");
  var vocabularies = [];
  textBoxes.forEach((element, index)=>{
      let dialoguePElements = element.getElementsByTagName("p");
      let strings = [];
      for (let i = 0; i < dialoguePElements.length; i++){
          let text = dialoguePElements[i].innerText;
          strings.push(text);
      }
      vocabularies.push(`${strings[0]} [ ${strings[1]} ]    ${strings[2]}`);
  })
  let vocabulariesString = vocabularies.join("\n");
  const copyToClip = async (vocabulariesString) => {
    try {
      await navigator.clipboard.writeText(vocabulariesString);
      // console.log('Content copied to clipboard');
      alert('Dialogue copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy dialogue to clipboard. Check console on your browser.');
    }
  }
  
  alert("Turn off the extension pop-up. \n(Click anywhere on the page body to disable the pop-up)")
  setTimeout(() => { copyToClip(vocabulariesString) }, 500)
}
function extractVocabulary() {
  let vocabularySection = document.getElementById("vocabulary");
  let textBoxes = vocabularySection.querySelectorAll(".text-box");
  var vocabularies = [];
  textBoxes.forEach((element, index)=>{
      let dialoguePElements = element.getElementsByTagName("p");
      let strings = [];
      for (let i = 0; i < dialoguePElements.length; i++){
          let text = dialoguePElements[i].innerText;
          strings.push(text);
      }
      vocabularies.push(`${strings[0]} [ ${strings[1]} ]    ${strings[2]}`);
  })
  let vocabulariesString = vocabularies.join("\n");
  const copyToClip = async (vocabulariesString) => {
    try {
      await navigator.clipboard.writeText(vocabulariesString);
      alert('Vocabularies copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy vocabularies to clipboard. Check console on your browser.');
    }
  }
  
  alert("Turn off the extension pop-up. \n(Click anywhere on the page body to disable the pop-up)")
  setTimeout(() => { copyToClip(vocabulariesString) }, 500)
  
}