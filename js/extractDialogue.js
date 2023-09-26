let extractDialogueButton = document.getElementById("extractDialogueButton");
extractDialogueButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractDialogue,
    });
});


function extractDialogue() {
  let dialogueSection = document.getElementById("skit");
  let textBoxes = dialogueSection.querySelectorAll(".text-box");
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
      // console.log('Content copied to clipboard');
      alert('Dialogue copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy dialogue to clipboard. Check console on your browser.');
    }
  }
  
  alert("Turn off the extension pop-up. \n(Click anywhere on the page body to disable the pop-up)")

  // Save as txt and csv
  const blob = new Blob([text], { type: 'text/plain' });
  const aTag = document.createElement('a');
  aTag.href = URL.createObjectURL(blob);
  aTag.target = '_blank';
  aTag.download = fileName;
  aTag.click();
  URL.revokeObjectURL(aTag.href);

  // Save to clipboard
  copyToClip(vocabularyString);

}



