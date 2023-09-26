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
  var vocabularyCsvOutputList = [];
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
      vocabularyCsvOutputList.push(`${japanese},${yomigana},${definition}`);
    }
  }
  console.log(vocabularyList);
  let vocabularyString = vocabularyList.join("\n");
  let vocabularyCsvString = vocabularyCsvOutputList.join("\n");

  // Save to clipboard
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

  // Save as txt
  let lessonNumber = document.getElementById("tab-title").innerHTML.split("</span>")[1];
  let fileName = `#${lessonNumber}-script_nhk-jp-grammer.txt`
  let blob = new Blob([vocabularyString], { type: 'text/plain' });
  let aTag = document.createElement('a');
  aTag.href = URL.createObjectURL(blob);
  aTag.target = '_blank';
  aTag.download = fileName;
  aTag.click();
  URL.revokeObjectURL(aTag.href);

  // Save as csv
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  blob = new Blob([bom, vocabularyCsvString], { type: 'text/csv' });
  aTag = document.createElement('a');
  aTag.href = URL.createObjectURL(blob);
  aTag.target = '_blank';
  fileName = `#${lessonNumber}-script_nhk-jp-grammer.csv`
  aTag.download = fileName;
  aTag.click();
  URL.revokeObjectURL(aTag.href);
    

  }