// requires prior injection of utils.js

MoneyStorageLogin2();


async function MoneyStorageLogin2() {
  const email = "";
  const password = "";
  await WaitForElement('button[id*="btnLogin"]');
  if (Select('button[id*="btnLogin"]')) {
    Select('input[name*="email"]').value = email;
    Select('input[name*="pwd"]').value = password;
    await ClickAndWait('button[id*="btnLogin"]');
  }
}