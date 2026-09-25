/**
 * SuperJobGenie Background Service Worker (Manifest V3)
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('[SuperJobGenie] Extension installed successfully.');
  chrome.storage.local.set({
    sjgSettings: {
      enableDeepExtract: true,
      autoShowHud: true,
      backendApiUrl: 'http://localhost:3000'
    }
  });
});
