//UNO
//icons: https://favicon.io/favicon-generator/
var menuItem = {
    "id": "UNO",
    "title": "UNO",
    "contexts": ["selection", "page"]
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

function search_youtube(text) {
    var wikiUrl = "https://www.youtube.com/results?search_query=" + fixedEncodeURI(text);
    // "https://en.wikipedia.org/wiki/"
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

function search_google(text) {
    var url = "https://www.google.com/search?q=" + fixedEncodeURI(text);
    chrome.tabs.create({
        url: url
    });
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "UNO") {
        if (clickData.selectionText) {
            console.log(clickData.selectionText);

            let text = clickData.selectionText;

            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let url = tabs[0].url;
                let uno_url = "http://kindsminds.corp.gq1.yahoo.com:2222/uno?input=" + fixedEncodeURI(text) + "&title_only=False&K=0";
                chrome.tabs.create({
                    url: uno_url
                });

                // search_youtube(text);
            });
        } else {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                let url = tabs[0].url;
                let uno_url = "http://kindsminds.corp.gq1.yahoo.com:2222/uno?input=" + fixedEncodeURI(url) + "&title_only=False&K=5";
                chrome.tabs.create({
                    url: uno_url
                });

                // search_youtube(text);
            });
        }

        let data = {element: "barium"};

        fetch("http://kindsminds.corp.gq1.yahoo.com:2223/mlx", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then(
                data => {
                    console.log("Request complete! response:", data);
                }
            )
        });


    }
});


chrome.commands.onCommand.addListener(function (command) {
    if (command.startsWith('search_youtube')) {

        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            text = selection[0];
            search_youtube(text);
        });
        //https://dev.to/paulasantamaria/adding-shortcuts-to-your-chrome-extension-2i20#:~:text=The%20user%20can%20bind%20the,chrome%3A%2F%2Fextensions%2Fshortcuts%20).&text=Any%20keyboard%20shortcut%20must%20use,We%20can%20also%20use%20Shift%20.
        // duplicateTab();
    } else if (command.startsWith('search_google')) {
        chrome.tabs.executeScript({
            code: "window.getSelection().toString();"
        }, function (selection) {
            text = selection[0];
            search_google(text);
        });
    } else {
        console.log(`Command ${command} not found`);
    }
});

/**
 * Gets the current active tab URL and opens a new tab with the same URL.
 */
function duplicateTab() {
    const query = {active: true, currentWindow: true};
    chrome.tabs.query(query, (tabs) => {
        chrome.tabs.create({url: tabs[0].url, active: false});
    });
}
