// =========================================================
// HỆ THỐNG ĐIỀU HÀNH AI
// PREMIUM EXECUTIVE MOTION SYSTEM
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main > section");

    // 1. Chuẩn bị các section (màn 1 giữ tĩnh)
    sections.forEach((section, index) => {
        if (index === 0) return;
        section.classList.add("reveal-section");
    });

    // 2. Gán class animation cho phần tử con
    function addReveal(section, selector, className) {
        section.querySelectorAll(selector).forEach((element) => {
            element.classList.add(className, "reveal-ready");
        });
    }

    // Mỗi màn: [selector, class animation]
    const scenes = {
        ".ai-scene": [
            [".scene-copy:first-child", "reveal-title"],
            [".phone", "reveal-phone"],
            [".right-copy", "reveal-text"],
            [".boss-message", "reveal-card"],
            [".ai-message", "reveal-card"]
        ],
        ".transition-scene": [
            ["h2", "reveal-title"],
            [".system-visual", "reveal-phone"],
            [".system-card", "reveal-card"],
            [".transition-title", "reveal-flow"],
            [".transition-description", "reveal-text"]
        ],
        ".operation-scene": [
            ["h2", "reveal-title"],
            [".operation-flow", "reveal-flow"],
            [".operation-step", "reveal-card"],
            [".operation-statement", "reveal-text"]
        ],
        ".day-scene": [
            ["h2", "reveal-title"],
            [".day-block", "reveal-card"],
            [".decision-block", "reveal-flow"],
            [".day-closing", "reveal-text"]
        ],
        ".dashboard-scene": [
            ["h2", "reveal-title"],
            [".dashboard-intro", "reveal-text"],
            [".executive-dashboard", "reveal-chart"],
            [".metric-card", "reveal-card"],
            [".dashboard-panel", "reveal-card"],
            [".dashboard-statement", "reveal-text"]
        ],
        ".interactive-scene": [
            ["h2", "reveal-title"],
            [".interactive-intro", "reveal-text"],
            [".question-demo", "reveal-card"],
            [".discount-answer", "reveal-chart"],
            [".comparison-card", "reveal-card"],
            [".save-dashboard", "reveal-flow"],
            [".interactive-closing", "reveal-text"]
        ],
        ".history-scene": [
            ["h2", "reveal-title"],
            [".history-intro", "reveal-text"],
            [".history-item", "reveal-card"],
            [".history-question", "reveal-card"],
            [".history-answer", "reveal-chart"],
            [".meeting-block", "reveal-flow"],
            [".history-closing", "reveal-text"]
        ],
        ".executive-value-scene": [
            [".executive-value-intro", "reveal-title"],
            [".value-case", "reveal-card"],
            [".executive-value-core", "reveal-title"],
            [".executive-value-flow", "reveal-flow"],
            [".executive-value-anywhere", "reveal-phone"],
            [".executive-value-summary", "reveal-title"],
            [".executive-value-distance", "reveal-text"],
            [".executive-value-closing", "reveal-title"]
        ],
        ".screen-10": [
            [".screen-10-intro", "reveal-title"],
            [".screen-10-phone-wrap", "reveal-phone"],
            [".screen-10-simple", "reveal-flow"],
            [".screen-10-key", "reveal-title"],
            [".screen-10-anywhere", "reveal-phone"],
            [".screen-10-team", "reveal-card"],
            [".screen-10-transition", "reveal-flow"],
            [".screen-10-final", "reveal-title"],
            [".screen-10-system", "reveal-card"],
            [".screen-10-purpose", "reveal-text"],
            [".screen-10-pilot", "reveal-flow"],
            [".screen-10-investment", "reveal-title"],
            [".screen-10-closing", "reveal-title"]
        ]
    };

    Object.entries(scenes).forEach(([sceneSelector, rules]) => {
        const scene = document.querySelector(sceneSelector);
        if (!scene) return;
        rules.forEach(([selector, className]) => addReveal(scene, selector, className));
    });

    // 3. Trình duyệt quá cũ, không có IntersectionObserver: hiện hết nội dung
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal-section").forEach((section) => {
            section.classList.add("is-visible");
        });
        document.querySelectorAll(".reveal-ready").forEach((el) => {
            el.classList.add("story-visible");
        });
        return;
    }

    // 4. Màn 9 & 10: từng phần tử hiện khi cuộn tới (story-visible)
    const storyObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("story-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -18% 0px" }
    );

    [".executive-value-scene", ".screen-10"].forEach((sceneSelector) => {
        const scene = document.querySelector(sceneSelector);
        if (!scene) return;
        scene.querySelectorAll(".reveal-ready").forEach((item) => storyObserver.observe(item));
    });

    // 5. Các màn còn lại: cả section hiện một lần (is-visible)
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05 }
    );

    document.querySelectorAll(".reveal-section").forEach((section) => revealObserver.observe(section));
});
