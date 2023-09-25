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


let extractScriptButton = document.getElementById("extractScriptButton");
extractScriptButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractScripts,
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
  setTimeout(() => { copyToClip(vocabularyString) }, 500)
}

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

function extractScripts() {
  let scriptRows = document.getElementsByTagName("tr");
  var vocabularyList = [];
  for (let i = 0; i < scriptRows.length; i++) {
    if ( scriptRows[i].className == "line-ja" ){
      var speaker = scriptRows[i].querySelector("th").innerText;
      var japanese = scriptRows[i].querySelector("td").innerText;
      // console.log(`speaker: ${speaker}`);
      // console.log(`Japanese: ${japanese}`);
    } else if ( scriptRows[i].className == "line-yomi") {
      var speaker = scriptRows[i].querySelector("th").innerText;
      var yomigana = scriptRows[i].querySelector("td").innerHTML.split("<div")[0];
      yomigana = yomigana.replace("<br>"," ").replaceAll(/\r?\n/g, '').replaceAll(/\t/g, "").replace(/.$/, " ");
      var definition = scriptRows[i].querySelector("td div").innerText;
      // console.log(`Speaker: ${speaker}`);
      // console.log(`Yomigana: ${yomigana}`);
      // console.log(`Definition: ${definition}`);
      vocabularyList.push(`${japanese} [${yomigana}]    ${definition}`.replaceAll(/\r?\n/g, '').replaceAll(/\t/g, ""));
    }
  }
  console.log(vocabularyList);
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