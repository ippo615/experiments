function toggleSidebar(){
    if(sidebarAction.isOpen()){
        sidebarAction.close();
    }else{
        sidebarAction.open();
    }
}

function showMessage(){
    console.info('HELLO WORLD!')
}

function replaceText(){
    console.info('')
}

browser.browserAction.onClicked.addListener(showMessage);
