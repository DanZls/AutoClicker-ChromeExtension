// requires prior injection of utils.js

ClickLoginButton();

if (document.readyState === 'loading') { 
  document.addEventListener('DOMContentLoaded', () => {
    GetAccountData();
  });
}
else {
  GetAccountData();
}


chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    try {
      if (message.action === 'GetAccountData') {
        GetAccountData().then((accountData) => {
          sendResponse({ success: true, accountData: accountData });
        });
      }
    }
    catch (error){
      console.log(error);
      sendResponse({ success: false });
    }
    return true;
  }
);


async function ClickLoginButton() {
  if (Select('button[onclick*="window.location"][class*="success"]')) {
    await ClickAndWait('button[onclick*="window.location"][class*="success"]');
  }
}


async function GetAccountData() {
  await ClickLoginButton();
  LogWithDatetime("GetAccountData");
  wallets = {};
  const walletNodes = SelectAll('a[class*="wallet-link"]');
  for (const walletNode of walletNodes) {
    if (walletNode) {
      const currency = Select('span[class*="wallet-link--type"]', walletNode)?.textContent;
      const amount = Select('span[class*="wallet-link--amount"]', walletNode)?.textContent;
      if (currency && amount) {
        wallets[currency] = parseFloat(amount.replace(' ', '').replace(',', '.'));
      }
    }
  }
  console.log(wallets);
  LogWithDatetime("GetAccountData is successful");
  return wallets;
}