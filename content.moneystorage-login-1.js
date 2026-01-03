// requires prior injection of utils.js

MoneyStorageLogin1();


async function MoneyStorageLogin1() {
  await WaitForElement('button[class*="auth"]');
  if (Select('button[class*="auth"]')) {
    await ClickAndWait('button[class*="auth"]');
  }
}