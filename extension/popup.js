document.addEventListener('DOMContentLoaded', async () => {
  const openInPageModalBtn = document.getElementById('openInPageModal');
  const openLocalDashboardBtn = document.getElementById('openLocalDashboard');
  const jobPreviewBox = document.getElementById('jobPreviewBox');
  const previewTitle = document.getElementById('previewTitle');
  const previewMeta = document.getElementById('previewMeta');

  // 1. 探针检测当前活跃 Tab
  let activeTab = null;
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs && tabs[0]) {
      activeTab = tabs[0];
      // 尝试向当前页面发送 ping
      chrome.tabs.sendMessage(activeTab.id, { action: 'ping' }, (response) => {
        if (chrome.runtime.lastError) {
          // 未注入或非匹配页面
        } else if (response && response.jobTitle) {
          if (jobPreviewBox && previewTitle && previewMeta) {
            jobPreviewBox.style.display = 'block';
            previewTitle.innerText = `🎯 ${response.jobTitle}`;
            previewMeta.innerText = `${response.company || '招聘方'} • ${response.charCount || 0} 字符 (全量无截断)`;
          }
        }
      });
    }
  } catch (e) {
    console.error(e);
  }

  // 2. 唤起招聘网页面内沉浸式大弹窗
  if (openInPageModalBtn) {
    openInPageModalBtn.addEventListener('click', async () => {
      if (!activeTab || !activeTab.id) return;

      chrome.tabs.sendMessage(activeTab.id, { action: 'open_inpage_modal' }, async (response) => {
        if (chrome.runtime.lastError) {
          // 如果 content script 尚未注入，动态注入后重新打开
          try {
            await chrome.scripting.insertCSS({
              target: { tabId: activeTab.id },
              files: ['styles.css']
            });
            await chrome.scripting.executeScript({
              target: { tabId: activeTab.id },
              files: ['content.js']
            });
            setTimeout(() => {
              chrome.tabs.sendMessage(activeTab.id, { action: 'open_inpage_modal' });
              window.close();
            }, 300);
          } catch (injectErr) {
            alert('提示: 请在招聘网站（如 Indeed / LinkedIn）页面上点击此按钮唤起页面弹窗！');
          }
        } else {
          window.close(); // 成功唤起后关闭扩展小弹窗，聚焦页面大弹窗
        }
      });
    });
  }

  // 3. 打开本地/远程全景控制台
  if (openLocalDashboardBtn) {
    openLocalDashboardBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: 'http://localhost:3000' });
    });
  }
});

