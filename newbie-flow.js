// requires prior injection of utils.js

class NewbieFlow {
  static async NavigateToFlowCabinet() {
    NavigateToPage("/cabinet");
    await WaitForElement('button[data-program="newbie"]');
    Click('button[data-program="newbie"]');
    await WaitForElement('li[class*="cabinet__tabs-tab"][class*="color--newbie"][class*="selected"]');
    await Wait(2);
    LogWithDatetime("NewbieFlow: Flow tab selected");
  }

  static async NavigateToFlowCalc() {
    NavigateToPage("/calc");
    await WaitForElement('button[data-program="newbie"]');
    Click('button[data-program="newbie"]');
    await WaitForElement('li[class*="cabinet__tabs-tab"][class*="color--newbie"][class*="selected"]');
    LogWithDatetime("NewbieFlow: Flow tab selected");
  }

  static async GetMoneyboxAmount() {
    await WaitForElement('div[data-premium-amount]');
    const moneyboxAmountElement = Select('div[data-premium-amount]');
    const moneyboxAmount = parseFloat(moneyboxAmountElement.dataset.premiumAmount);
    return moneyboxAmount;
  }

  static async GetFlowAmount() {
    await WaitForElement('button[class*="pull-flow desktop"][data-program="newbie"]');
    const flowAmount = parseFloat(Select('button[class*="pull-flow desktop"][data-program="newbie"]').dataset.contribution);
    return flowAmount;
  }

  static async GetMaxFlowAmount() {
    await WaitForElement('button[class*="pull-flow desktop"][data-program="newbie"]');
    const maxFlowAmount = parseFloat(Select('button[class*="pull-flow desktop"][data-program="newbie"]').dataset.maximumBalance);
    return maxFlowAmount;
  }

  static async AccrueToMoneybox() {
    await WaitForElement('button[class*="getmydaysbonus"][rel="0"]');
    if (Select('button[class*="getmydaysbonus"][rel="0"]')?.innerText?.includes('Accrue reward')) {
      await ClickAndWait('button[class*="getmydaysbonus"][rel="0"]');
      await ClickAndWait('button[class*="btn_close"][value="Ok"]');
      await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    }
    const walletAmount = parseFloat(Select('button[class*="withdrawal money-transfer-default"]').dataset.walletAmount);
    if (walletAmount > 0) {
      await ClickAndWait('button[class*="withdrawal money-transfer-default"]');
      await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    }
    LogWithDatetime("NewbieFlow: AccrueToMoneybox is successful");
  }

  static async TopUpFromNewbieMoneybox(topUpAmount) {
    const topUpButtonSelector = 'button[class="icon pull-flow desktop"][data-program="newbie"]';
    await WaitForElement(topUpButtonSelector);
    await ClickAndWait(topUpButtonSelector);
    Select('input[class="input number_only"][id="needTopUpAmount"]').value = topUpAmount;
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    LogWithDatetime("NewbieFlow: TopUpFromNewbieMoneybox is successful");
  }
}