let extractScriptButton = document.getElementById("extractScriptButton");
extractScriptButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractScripts,
    });
});

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
    copyToClip(vocabularyString);
  
  }