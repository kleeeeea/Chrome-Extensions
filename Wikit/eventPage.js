var menuItem = {
    "id": "Wikit",
    "title": "Wikit",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

function search_youtube(text, clickData) {
    var wikiUrl = "https://www.youtube.com/results?search_query=" + fixedEncodeURI(text);
    // "https://en.wikipedia.org/wiki/"
    console.log(clickData.selectionText);
    console.log('clickData.selectionText');
    // var createData = {
    //     "url": wikiUrl,
    //     "type": "popup",
    //     "top": 5,
    //     "left": 5,
    //     // "width": screen.availWidth/2,
    //     // "height": screen.availHeight/2
    // };
    // chrome.tabs.create(createData, function(){});

    //https://riptutorial.com/google-chrome-extension/example/20275/create-a-new-tab
    //https://developer.chrome.com/docs/extensions/reference/tabs/#opening-an-extension-page-in-a-new-tab
    chrome.tabs.create({
        url: wikiUrl
    });
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "Wikit" && clickData.selectionText) {

        let text = clickData.selectionText;
        search_youtube(text, clickData);
    }

});


chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'duplicate-tab':
            duplicateTab();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

/**
* Gets the current active tab URL and opens a new tab with the same URL.
*/
function duplicateTab() {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        chrome.tabs.create({ url: tabs[0].url, active: false });
    });
}
