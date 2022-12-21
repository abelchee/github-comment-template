chrome.commands.onCommand.addListener(async (command) => {
  const storage = await chrome.storage.sync.get(["template1", "template2"]);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab && tab.id && storage[command]) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          template: storage[command],
        },
        (msg) => {
          console.log("result message:", msg);
        }
      );
    }
  });
});
