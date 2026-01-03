
async function WaitForElement(selector, parentNode = window.document) {
  const startTime = Date.now();
  while (!Select(selector, parentNode)){
    await Wait(0.1);
  }
}


async function ClickAndWait(selector, parentNode = window.document, delayInSeconds = 5) {
  if (Select(selector, parentNode)){
    Click(selector, parentNode);
    await Wait(delayInSeconds);
  }
}


function Click(selector, parentNode = window.document) {
  Select(selector, parentNode).click();
}


function Select(selector, parentNode = window.document) {
  return parentNode.querySelector(selector);
}


function SelectAll(selector, parentNode = window.document) {
  return parentNode.querySelectorAll(selector);
}


async function NavigateToPageAndWait(pageUrl, delayInSeconds = 5) {
  if (window.location.pathname !== pageUrl) {
    window.location.href = pageUrl;
    await Wait(delayInSeconds);
    LogWithDatetime("Navigated to page " + pageUrl);
  }
}


async function Wait(delayInSeconds) {
  await new Promise(resolve => setTimeout(resolve, delayInSeconds*1000));
}


function LogWithDatetime(message) {
  console.log(message + "\n" + new Date().toString());
}


function RandomFloat(lowerLimit, upperLimit, precision=2) {
  return parseFloat((Math.random() * (upperLimit - lowerLimit) + lowerLimit).toFixed(precision));
}