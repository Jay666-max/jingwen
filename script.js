document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const switchSutraBtn = document.getElementById('switch-sutra');
    const sutraContent = document.getElementById('sutra-content');
    const body = document.body;
    
    // 初始化状态
    let isDarkTheme = false;
    let currentFontSize = 18; // 默认字体大小
    
    // 从本地存储加载用户偏好设置
    loadUserPreferences();
    
    // 切换主题
    toggleThemeBtn.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            body.classList.add('dark-theme');
            toggleThemeBtn.textContent = '切换为明亮主题';
        } else {
            body.classList.remove('dark-theme');
            toggleThemeBtn.textContent = '切换为暗黑主题';
        }
        saveUserPreferences();
    });
    
    // 增大字体
    increaseFontBtn.addEventListener('click', function() {
        if (currentFontSize < 28) { // 设置最大字体大小
            currentFontSize += 2;
            document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
            saveUserPreferences();
        }
    });
    
    // 减小字体
    decreaseFontBtn.addEventListener('click', function() {
        if (currentFontSize > 14) { // 设置最小字体大小
            currentFontSize -= 2;
            document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
            saveUserPreferences();
        }
    });
    
    // 保存用户偏好设置到本地存储
    function saveUserPreferences() {
        const preferences = {
            isDarkTheme: isDarkTheme,
            fontSize: currentFontSize
        };
        localStorage.setItem('sutraPreferences', JSON.stringify(preferences));
    }
    
    // 从本地存储加载用户偏好设置
    function loadUserPreferences() {
        const savedPreferences = localStorage.getItem('sutraPreferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            
            // 应用主题
            isDarkTheme = preferences.isDarkTheme;
            if (isDarkTheme) {
                body.classList.add('dark-theme');
                toggleThemeBtn.textContent = '切换为明亮主题';
            }
            
            // 应用字体大小
            currentFontSize = preferences.fontSize || currentFontSize;
            document.documentElement.style.setProperty('--font-size', currentFontSize + 'px');
        }
    }
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 切换经文功能
    if (switchSutraBtn) {
        switchSutraBtn.addEventListener('click', function() {
            const currentSutra = this.getAttribute('data-sutra');
            if (currentSutra === 'liuzu') {
                // 当前在金刚经页面，切换到六祖坛经
                window.location.href = 'liuzutanjing.html';
            } else if (currentSutra === 'jingang') {
                // 当前在六祖坛经页面，切换到金刚经
                window.location.href = 'index.html';
            }
        });
    }
});