/********************************************************** 
 * Process that runs when shortcut key (Shift+Command+E) was pressed
 * (content.js will recieve a signal from background.js)
 ------------------------------------------------------- */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === '_extract_dialogues') {
    
    /** -------------------- 
     * 
     * process is written here 
     * 
     * --------------------- */
    
    console.log("Shortcut key (Ctrl+Shift+E) was pressed");
    sendResponse({ message: 'Extract dialogues' });
  }
});
