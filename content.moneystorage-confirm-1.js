// requires prior injection of utils.js

MoneyStorageConfirm1();


async function MoneyStorageConfirm1() {
  await WaitForElement('button[class*="success"]:not([disabled])');
  const currency = Select('span[class*="merchant-text"]').textContent.split(' ')[2];
  if (currency !== "ECR"){
    return;
  }
  if (Select('button[class*="success"]') && !Select('button[class*="success"]').hasAttribute('disabled')) {
    await ClickAndWait('button[class*="success"]');
  }
  else {
    await ClickAndWait('button[class*="cancel"]');
  }
  LogWithDatetime("ConfirmOnMoneyStorage is successful");
}