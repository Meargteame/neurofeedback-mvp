document.addEventListener('DOMContentLoaded', () => {
    const userIdInput = document.getElementById('userId');
    const tokenInput = document.getElementById('token');
    const saveBtn = document.getElementById('saveBtn');
    const statusText = document.getElementById('statusText');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['user_id', 'token'], (result) => {
        if (result.user_id) {
            userIdInput.value = result.user_id;
            setStatus(true);
        }
        if (result.token) {
            tokenInput.value = result.token;
        }
    });

    saveBtn.addEventListener('click', () => {
        const userId = userIdInput.value.trim();
        const token = tokenInput.value.trim();
        
        if (userId && token) {
            chrome.storage.sync.set({ user_id: userId, token: token }, () => {
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
