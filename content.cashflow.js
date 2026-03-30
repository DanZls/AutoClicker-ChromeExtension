// requires prior injection of utils.js, newbie-flow.js

WaitForElement('li[class*="cabinet__tabs-tab"]')
  .then(async () => {
    if (window.location.pathname !== '/cabinet')
      return;
    if (Select('button[class*="btn_close"][value="Ok"]'))
      await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    // await FastFlowSequence();
    await NewbieFlowSequence();
  });


// chrome.runtime.onMessage.addListener(
//   (message, sender, sendResponse) => {
//     try {
//       if (message.action === 'ClickSequence') {
//         FastFlowSequence().then(() => {
//           sendResponse({ success: true });
//         });
//       }
//     }
//     catch (error){
//       console.log(error);
//       sendResponse({ success: false });
//     }
//     return true;
//   }
// );

async function NewbieFlowSequence() {
  // if (window.location.host !== 'eur.cashflow.fund')
  //   return;
  await NewbieFlow.NavigateToFlowCabinet();
  await NewbieFlow.AccrueToMoneybox();
  const moneyboxAmount = await NewbieFlow.GetMoneyboxAmount();
  const flowAmount = await NewbieFlow.GetFlowAmount();
  const maxFlowAmount = await NewbieFlow.GetMaxFlowAmount();
  const maxTopUpAmount = ((maxFlowAmount - flowAmount) / 1.5).toFixed(2) - 0.01;
  console.log(maxTopUpAmount);
  const topUpAmount = Math.min(moneyboxAmount, maxTopUpAmount);
  console.log(topUpAmount);
  if (topUpAmount >= 20) {
    await NewbieFlow.TopUpFromNewbieMoneybox(moneyboxAmount);
  }
  LogWithDatetime("NewbieFlowSequence success");
}


async function FastFlowSequence() {
  await NavigateToPageAndWait("/cabinet");
  await SelectFlowTab("FastFlow");
  await Wait(1);
  // await StartPullEcurrency();
  await CompleteWithdrawalToMoneystorage();
  await AccrueToDripped();
  await TransferDrippedToMoneybox();
  // await TransferMoneyboxToMoneystorage();
  // await StartPullEcurrency();
  LogWithDatetime("FastFlowSequence success");
}


async function SelectFlowTab(flowTab) {
  // flowTab: 'FastFlow', 'StartFlow', 'GrowingFlow'
  if (flowTab === "FastFlow" && Select('button[data-program="fastflow"]')){
    await ClickAndWait('button[data-program="fastflow"]');
    LogWithDatetime("FastFlow tab selected");
  }
  else if (flowTab === "StartFlow" && Select('button[data-program="startflow"]')){
    await ClickAndWait('button[data-program="startflow"]');
    LogWithDatetime("StartFlow tab selected");
  }
  else if (flowTab === "GrowingFlow" && Select('button[data-program="growing"]')){
    await ClickAndWait('button[data-program="growing"]');
    LogWithDatetime("GrowingFlow tab selected");
  }
}


async function AccrueToDripped() {
  await WaitForElement('button[class*="getmydaysbonus"][rel="0"]');
  if (Select('button[class*="getmydaysbonus"][rel="0"]')?.innerText?.includes('Accrue reward')) {
    await ClickAndWait('button[class*="getmydaysbonus"][rel="0"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    LogWithDatetime("AccrueToDripped is successful");
  }
  else {
    LogWithDatetime("AccrueToDripped is not available");
  }
}


async function TransferDrippedToMoneybox() {
  if (Select('button[id="dripp_all"]:not([class*="disabled"])')) {
    await ClickAndWait('button[id="dripp_all"]');
    await ClickAndWait('label[class*="label-radio"][for="withdrawPremium"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    LogWithDatetime("TransferDrippedToMoneybox is successful");
  }
  else {
    LogWithDatetime("TransferDrippedToMoneybox is not available");
  }
}


async function TransferMoneyboxToMoneystorage() {
  if (Select('button[class*="money-topay-btn"]:not([class*="disabled"])')) {
    await ClickAndWait('button[class*="money-topay-btn"]');
    await ClickAndWait('p[id="availableAmount"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    LogWithDatetime("TransferMoneyboxToMoneystorage is successful");
  }
  else {
    LogWithDatetime("TransferMoneyboxToMoneystorage is not available");
  }
}


async function CompleteWithdrawalToMoneystorage() {
  if (Select('button[class="btn_wait_ack_confirm"]')){
    await ClickAndWait('button[class="btn_wait_ack_confirm"]');
    Select('textarea[name="comment"][class="wait_ack_comment"]').value = "Thank you!";
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    LogWithDatetime("CompleteWithdrawalToMoneystorage is successful");
  }
  else {
    LogWithDatetime("CompleteWithdrawalToMoneystorage is not available");
  }
}


async function StartPullEcurrency() {
  if (Select('button[class*="convert-ecr"]')) {
    await ClickAndWait('button[class*="convert-ecr"]');
    await ClickAndWait('button[class*="btn_close"][value="Ok"]');
    LogWithDatetime("StartPullEcurrency is successful");
  }
  else {
    LogWithDatetime("StartPullEcurrency is not available");
  }
}
