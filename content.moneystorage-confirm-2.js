// requires prior injection of utils.js

MoneyStorageConfirm2();


async function MoneyStorageConfirm2() {
  await WaitForElement('button[class*="success"]:not([disabled])');
  if (Select('button[class*="success"]')) {
    await ClickAndWait('button[class*="success"]');
    LogWithDatetime("ConfirmOnMoneyStorage is successful");
  }
}