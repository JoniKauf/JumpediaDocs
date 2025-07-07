const sidebar = document.getElementById("sidebar");
const resizeThreshold = 10;
let isResizing = false;
let startX = 0;
let startWidth = 0;

sidebar.addEventListener("mousemove", (e) => {
    const rect = sidebar.getBoundingClientRect();
    const nearRightEdge = rect.right - e.clientX < resizeThreshold;
    sidebar.style.cursor = nearRightEdge ? "ew-resize" : "default";
});

sidebar.addEventListener("mousedown", (e) => {
    const rect = sidebar.getBoundingClientRect();
    if (rect.right - e.clientX < resizeThreshold) {
    isResizing = true;
    startX = e.clientX;
    startWidth = rect.width;
    document.body.style.cursor = "ew-resize";
    e.preventDefault();
    }
});

document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const dx = e.clientX - startX;
    const newWidth = Math.min(Math.max(startWidth + dx, 100), 600); // clamp width
    sidebar.style.width = `${newWidth}px`;
});

document.addEventListener("mouseup", () => {
    if (isResizing) {
    isResizing = false;
    document.body.style.cursor = "default";
    }
});