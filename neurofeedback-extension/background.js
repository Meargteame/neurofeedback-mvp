// NeuroFeedback.OS Background Service
const API_URL = 'http://localhost:3001';

// Session State
let session = {
    activeSeconds: 0,
    idleSeconds: 0,
    tabSwitches: 0,
    keystrokes: 0,
    clicks: 0,
    scrolls: 0
};

let userId = null;
let token = null;

// Load settings
chrome.storage.sync.get(['user_id', 'token'], (result) => {
    if (result.user_id) userId = result.user_id;
    if (result.token) token = result.token;
});

// Listen for settings changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.user_id) userId = changes.user_id.newValue;
    if (changes.token) token = changes.token.newValue;
});

// Track Tab Switches
chrome.tabs.onActivated.addListener(() => {
    session.tabSwitches++;
});

// Handle Content Script Messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TELEMETRY_UPDATE') {
        session.keystrokes += message.data.keystrokes;
        session.clicks += message.data.clicks;
        session.scrolls += message.data.scrolls;
    }
});

// Heartbeat / Sync Loop (Every 1 minute)
// We use alarms for reliable timing in Service Workers
chrome.alarms.create('syncLoop', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'syncLoop') {
        syncMetrics();
    }
});

// Track Active/Idle Time (Check every second roughly via interval for local state, but sync less often)
// Service workers can go dormant, so we rely on the alarm for the big sync.
// For accurate time tracking, we check idle state.

async function syncMetrics() {
    if (!userId) {
        console.log('No User ID configured. Skipping sync.');
        return;
    }

    // Check idle state
    // 60 seconds detection threshold
    chrome.idle.queryState(60, async (state) => {
        if (state === 'active') {
            session.activeSeconds += 60; // Approximate for the alarm interval
        } else {
            session.idleSeconds += 60;
        }

        // Prepare payload
        const payload = {
            user_id: userId,
            active_time: (session.activeSeconds || 0) / 60, // minutes
            idle_time: (session.idleSeconds || 0) / 60,
            tab_switches: session.tabSwitches || 0,
            typing_events: (session.keystrokes || 0) + (session.clicks || 0) // Aggregate for MVP
        };

        try {
            const response = await fetch(`${API_URL}/metrics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('Metrics synced successfully');
                // Reset counters after successful sync
                session = {
                    activeSeconds: 0,
                    idleSeconds: 0,
                    tabSwitches: 0,
                    keystrokes: 0,
                    clicks: 0,
                    scrolls: 0
                };
            } else {
                console.error('Failed to sync metrics', response.status);
            }
        } catch (error) {
            console.error('Network error syncing metrics', error);
        }
    });
}
