
chrome.runtime.onStartup.addListener(() => {
  setAlarms();
});


chrome.runtime.onInstalled.addListener(() => {
  setAlarms();
});


function setAlarms() {
  chrome.alarms.create('clickAlarm1', {delayInMinutes: 1, periodInMinutes: 37});
}


// Handle alarm events
chrome.alarms.onAlarm.addListener(
  async (alarm) => {
    if (alarm.name === 'clickAlarm1') {
      if (new Date().getDay() !== 0) { // check for Sunday
        await clickSequenceOnAllTabs();
      }
    }
  }
);


// Handle messages from popup
chrome.runtime.onMessage.addListener(
  async (message, sender, sendResponse) => {
    if (message.action === 'clickNow') {
      await clickSequenceOnAllTabs();
      sendResponse({ success: true });
    }
    else if (message.action === 'openFlowsPage') {
      getMoneyStorageAccountData();
      await openFlowsPageOnAllTabs();
      sendResponse({ success: true });
    }
  }
);


async function getMoneyStorageAccountData() {
  const tab = (await chrome.tabs.query({ url: ['https://storage.money/account'] }))[0];
  await chrome.tabs.reload(tab.id);
  await new Promise((resolve, reject) => setTimeout(resolve, 2000));
  await chrome.tabs.sendMessage(tab.id, { action: 'GetAccountData' })
    .then((response) => console.log(response?.accountData))
    .catch((error) => console.log(error));
}


async function clickSequenceOnAllTabs() {
  const tabs = await getCashFlowTabs("cabinet");
  for (const tab of tabs) {
    clickSequenceOnTab(tab);
  }
}


async function clickSequenceOnTab(tab) {
  const originalDomain = tab.url;
  await chrome.tabs.reload(tab.id);
}


async function confirmOnMoneyStorage(tab) {
  if (tab.url === "https://storage.money/merchant_request") {
    // await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    await chrome.tabs.sendMessage(tab.id, { action: 'ConfirmOnMoneyStorage' });
  }
}


async function openFlowsPageOnAllTabs() {
  const tabs = await getCashFlowTabs("calc");
  for (const tab of tabs) {
    openFlowsPageOnTab(tab);
  }
}


async function openFlowsPageOnTab(tab) {
  await chrome.tabs.reload(tab.id);
  await new Promise((resolve, reject) => setTimeout(resolve, 4000));
  await chrome.tabs.sendMessage(tab.id, { action: 'OpenFlowsPage' })
    .catch((error) => console.log(error));
}


async function getCashFlowTabs(page) {
  const domains = [
    "https://eur.cashflow.fund",
    "https://es.cashflow.fund",
    "https://gb.cashflow.fund",
    "https://pl.cashflow.fund",
    "https://kg.cashflow.fund",
  ];
  let tabs = [];
  for (const domain of domains) {
    const domainTabs = await chrome.tabs.query({ url: [`${domain}/${page}`] });
    const domainTab = (domainTabs.length > 0) ? domainTabs[0] : await chrome.tabs.create({ url: domain });
    tabs.push(domainTab);
  }
  return tabs;
}


// Keep service worker alive
chrome.runtime.onMessage.addListener(() => {
  return true;
});