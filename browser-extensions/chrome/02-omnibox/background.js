
// This event is fired with the user accepts the input in the omnibox.
// chrome.omnibox.onInputEntered.addListener((text) => {
//     // Encode user input for special characters , / ? : @ & = + $ #
//     const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
//     chrome.tabs.create({ url: newURL });
// });

// chrome.omnibox.onInputStarted.addListener((text) => {
//     // console.info(browser.omnibox.setDefaultSuggestion);
//     // console.info(browser.omnibox.SuggestResult);
//     // console.info(browser.omnibox.DefaultSuggestResult);
//     // console.info(chrome.omnibox.DefaultSuggestResult);
//     // console.info(chrome.omnibox.SuggestResult);
//     // console.info(chrome.omnibox.DefaultSuggestResult);
//     // console.info(chrome.types.DefaultSuggestResult);
//     // console.info(chrome.omnibox.DefaultSuggestResult);
//     // console.info(chrome.omnibox.DefaultSuggestResult("Your current intention is <match>to get things done</match>."));
//     chrome.omnibox.setDefaultSuggestion(
//         "Your current intention is <match>to get things done</match>.", null
//         // chrome.omnibox.DefaultSuggestResult("Your current intention is <match>to get things done</match>.")
//     );
// });



chrome.omnibox.setDefaultSuggestion({
    description: "Type the name of a CSS property"
  });
  
  /*
  Very short list of a few CSS properties.
  */
  const props = [
    "animation",
    "background",
    "border",
    "box-shadow",
    "color",
    "display",
    "flex",
    "flex",
    "float",
    "font",
    "grid",
    "margin",
    "opacity",
    "overflow",
    "padding",
    "position",
    "transform",
    "transition"
  ];
  
  const baseURL = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
  
  /*
  Return an array of SuggestResult objects,
  one for each CSS property that matches the user's input.
  */
  function getMatchingProperties(input) {
    const result = [];
    for (const prop of props) {
      if (prop.startsWith(input)) {
        console.log(prop);
        const suggestion = {
          content: `${baseURL}${prop}`,
          description: prop
        }
        result.push(suggestion);
      } else if (result.length !== 0) {
        return result;
      }
    }
    return result;
  }
  
  chrome.omnibox.onInputChanged.addListener((input, suggest) => {
    suggest(getMatchingProperties(input));
  });
  
  chrome.omnibox.onInputEntered.addListener((url, disposition) => {
    switch (disposition) {
      case "currentTab":
        chrome.tabs.update({url});
        break;
      case "newForegroundTab":
        chrome.tabs.create({url});
        break;
      case "newBackgroundTab":
        chrome.tabs.create({url, active: false});
        break;
    }
  });

