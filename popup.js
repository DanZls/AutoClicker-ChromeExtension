document.addEventListener('DOMContentLoaded', async () => {

  const clickNowButton = document.getElementById('clickNow');
  clickNowButton.addEventListener('click', async () => {
    clickNowButton.textContent = 'Clicking...';
    clickNowButton.disabled = true;
    await chrome.runtime.sendMessage({ action: 'clickNow' });
    setTimeout(() => {
      clickNowButton.textContent = 'Click Now';
      clickNowButton.disabled = false;
    }, 500);
  });


  const openFlowsButton = document.getElementById('openFlowsPage');
  openFlowsButton.addEventListener('click', async () => {
    openFlowsButton.textContent = 'Opening...';
    openFlowsButton.disabled = true;
    await chrome.runtime.sendMessage({ action: 'openFlowsPage' });
    setTimeout(() => {
      openFlowsButton.textContent = 'Open Flows Page';
      openFlowsButton.disabled = false;
    }, 500);
  });
});