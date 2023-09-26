/** Activate shortcut key (send signal to content.js when shortcut key is pressed) */
chrome.commands.onCommand.addListener((command) => {
    console.log(`Received command: ${command}`);

    // Extract Dialogues
    if (command === '_extract_dialogues') {
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     chrome.tabs.sendMessage(tabs[0].id, { command: 'send-message' }, (response) => {
        //         console.log(response.message);
        //     });
        // });
    }

    // Extract Vocabulary
    if (command === '_extract_vocabulary') {
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     chrome.tabs.sendMessage(tabs[0].id, { command: 'send-message' }, (response) => {
        //         console.log(response.message);
        //     });
        // });
    }
});
