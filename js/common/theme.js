import { storage } from './storage.js';

export const theme = (() => {

    const themeColors = {
        '#ffffff': '#000000',
        '#f8f9fa': '#212529'
    };
    const themeLight = ['#ffffff', '#f8f9fa'];

    let isAuto = false;

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let themes = null;

    /**
     * @type {HTMLElement|null}
     */
    let metaTheme = null;

    /**
     * @returns {void}
     */
    const setLight = () => themes.set('active', 'light');

    /**
     * @param {string[]} listTheme
     * @returns {void}
     */
    const setMetaTheme = (listTheme) => {
        const now = metaTheme.getAttribute('content');
        metaTheme.setAttribute('content', listTheme.some((i) => i === now) ? themeColors[now] : now);
    };

    /**
     * @returns {void}
     */
    const onLight = () => {
        setLight();
        document.documentElement.setAttribute('data-bs-theme', 'light');
        setMetaTheme(themeLight);
    };

    /**
     * @returns {boolean|string}
     */
    const isDarkMode = (dark = null, light = null) => {
        if (dark && light) {
            return light;
        }
        return false;
    };

    /**
     * @returns {void}
     */
    const change = () => onLight();

    /**
     * @returns {boolean}
     */
    const isAutoMode = () => isAuto;

    /**
     * @returns {void}
     */
    const spyTop = () => {
        const callback = (es) => es.filter((e) => e.isIntersecting).forEach((e) => {
            const themeColor = themeLight[0]; // Always light
            metaTheme.setAttribute('content', themeColor);
        });

        const observerTop = new IntersectionObserver(callback, { rootMargin: '0% 0% -95% 0%' });
        document.querySelectorAll('section').forEach((e) => observerTop.observe(e));
    };

    /**
     * @returns {void}
     */
    const init = () => {
        themes = storage('theme');
        metaTheme = document.querySelector('meta[name="theme-color"]');
        onLight();
    };

    return {
        init,
        spyTop,
        change,
        isDarkMode,
        isAutoMode,
    };
})();