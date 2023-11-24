function runReplace(){
    alert('HEHEHEH')
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
        broswer.tabs.sendMessage(tabs[0].id, {"blah": "blah"});
        // replaceText(document.body);
        // restartAlarm(tabs[0].id);
    });
    
}

browser.browserAction.onClicked.addListener(runReplace);
