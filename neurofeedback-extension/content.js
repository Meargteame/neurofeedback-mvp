// NeuroFeedback.OS Content Sensor
// Privacy-First: Only counts events, never reads content.

let metrics = {
    keystrokes: 0,
    clicks: 0,
    scrolls: 0
};

// Listen for interactions
document.addEventListener('keydown', () => {
    metrics.keystrokes++;
});

document.addEventListener('mousedown', () => {
    metrics.clicks++;
});

let scrollTimeout;
document.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        metrics.scrolls++;
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
        }, 100); // Debounce scrolls
    }
});

// Send data to background script every 5 seconds if there is activity
setInterval(() => {
    if (metrics.keystrokes > 0 || metrics.clicks > 0 || metrics.scrolls > 0) {
        chrome.runtime.sendMessage({
            type: 'TELEMETRY_UPDATE',
            data: { ...metrics }
        });
        
        // Reset local counters
        metrics = {
            keystrokes: 0,
            clicks: 0,
            scrolls: 0
        };
    }
}, 5000);
