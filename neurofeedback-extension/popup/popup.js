document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('userId');
    const saveBtn = document.getElementById('saveBtn');
    const statusText = document.getElementById('statusText');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['user_id'], (result) => {
        if (result.user_id) {
            userIdInput.value = result.user_id;
            setStatus(true);
        }
    });

    saveBtn.addEventListener('click', () => {
        const userId = userIdInput.value.trim();
        if (userId) {
            chrome.storage.sync.set({ user_id: userId }, () => {
                setStatus(true);
            });
        }
    });

    function setStatus(connected) {
        if (connected) {
            statusText.textContent = 'ACTIVE_MONITORING';
            statusDiv.classList.add('active');
            saveBtn.textContent = 'UPDATE_LINK';
        } else {
            statusText.textContent = 'DISCONNECTED';
            statusDiv.classList.remove('active');
        }
    }
});
