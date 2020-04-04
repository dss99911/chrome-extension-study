class ScreenUtil {
    static isDarkMode() {
        return matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

export {ScreenUtil}