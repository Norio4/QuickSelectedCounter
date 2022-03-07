'use strict';

async function callPopUp() {
    const textCount = await countSelectedText();
}

async function countSelectedText() {
    const tab = await getCurrentTab();
    await chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: runScript
        },
        buildElement
    )
}

function runScript() {
    const _text = window.getSelection().toString();
    const obj = {
        'text': _text,
        'textCount': _text.length,
    }
    return JSON.stringify(obj)
}

function buildElement(result) {
    let resultObj = JSON.parse(result[0].result);
    const resultHtml = document.getElementById("counter");
    resultHtml.textContent = resultObj.textCount;
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
});

callPopUp();
