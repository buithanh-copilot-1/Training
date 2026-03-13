// ===== Data =====

// Novel data
const novels = [
    {
        id: 1,
        title: "Tiên Ma Đích Luyến",
        chapters: 500,
        views: 1200000,
        badge: "hot",
        badgeText: "HOT",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        icon: "fa-dragon",
        category: "tien-hiep"
    },
    {
        id: 2,
        title: "Ngôn Tình Sắc Đến Nghiện",
        chapters: 320,
        views: 890000,
        badge: "vip",
        badgeText: "VIP",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        icon: "fa-heart",
        category: "ngon-tinh"
    },
    {
        id: 3,
        title: "Xuyên Qua Thế Giới Linh Dị",
        chapters: 250,
        views: 756000,
        badge: "hot",
        badgeText: "HOT",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        icon: "fa-ghost",
        category: "huyen-huyen"
    },
    {
        id: 4,
        title: "Đế Chế Ngôn Tình",
        chapters: 1000,
        views: 2100000,
        badge: "vip",
        badgeText: "VIP",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        icon: "fa-crown",
        category: "ngon-tinh"
    },
    {
        id: 5,
        title: "Yêu Ai Cũng Không Bằng Yêu Mình",
        chapters: 180,
        views: 654000,
        badge: "hot",
        badgeText: "HOT",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        icon: "fa-kiss-wink-heart",
        category: "ngon-tinh"
    },
    {
        id: 6,
        title: "Trọng Sinh Chiết Ma",
        chapters: 450,
        views: 1500000,
        badge: "hot",
        badgeText: "HOT",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        icon: "fa-fist-raised",
        category: "huyen-huyen"
    },
    {
        id: 7,
        title: "Hôn Nhân Bí Mật",
        chapters: 200,
        views: 980000,
        badge: "vip",
        badgeText: "VIP",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        icon: "fa-gem",
        category: "ngon-tinh"
    },
    {
        id: 8,
        title: "Vợ Yêu Của Tổng Tài",
        chapters: 280,
        views: 1100000,
        badge: "vip",
        badgeText: "VIP",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        icon: "fa-heart-broken",
        category: "ngon-tinh"
    },
    {
        id: 9,
        title: "Linh Vực Chiến Thần",
        chapters: 800,
        views: 1800000,
        badge: "vip",
        badgeText: "VIP",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        icon: "fa-moon",
        category: "tien-hiep"
    },
    {
        id: 10,
        title: "Tu Tiên Đạo Tọa",
        chapters: 650,
        views: 1300000,
        badge: "vip",
        badgeText: "VIP",
        gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
        icon: "fa-dragon",
        category: "tien-hiep"
    },
    {
        id: 11,
        title: "Cô Vợ Ngọt Ngào Của Tổng Tài",
        chapters: 150,
        views: 750000,
        badge: null,
        badgeText: null,
        gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
        icon: "fa-sparkles",
        category: "ngon-tinh",
        updateTime: "2 giờ trước"
    },
    {
        id: 12,
        title: "Võ Đế Luân Hồi",
        chapters: 888,
        views: 920000,
        badge: null,
        badgeText: null,
        gradient: "linear-gradient(135deg, #5f27cd 0%, #48dbfb 100%)",
        icon: "fa-swords",
        category: "tien-hiep",
        updateTime: "3 giờ trước"
    },
    {
        id: 13,
        title: "Phàm Nhân Tu Tiên",
        chapters: 1200,
        views: 1800000,
        badge: "full",
        badgeText: "FULL",
        gradient: "linear-gradient(135deg, #ee5a24 0%, #f8b500 100%)",
        icon: "fa-hat-wizard",
        category: "tien-hiep",
        updateTime: "5 giờ trước"
    },
    {
        id: 14,
        title: "Thương Yêu Ngàn Năm",
        chapters: 350,
        views: 680000,
        badge: null,
        badgeText: null,
        gradient: "linear-gradient(135deg, #009432 0%, #c4e538 100%)",
        icon: "fa-yin-yang",
        category: "ngon-tinh",
        updateTime: "6 giờ trước"
    },
    {
        id: 15,
        title: "Hôn Nhân Mười Năm",
        chapters: 200,
        views: 850000,
        badge: "full",
        badgeText: "FULL",
        gradient: "linear-gradient(135deg, #ff9ff3 0%, #feca57 100%)",
        icon: "fa-ring",
        category: "ngon-tinh"
    },
    {
        id: 16,
        title: "Ta Là Đại Lão Tu Tiên",
        chapters: 1500,
        views: 2200000,
        badge: "full",
        badgeText: "FULL",
        gradient: "linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)",
        icon: "fa-dragon",
        category: "tien-hiep"
    },
    {
        id: 17,
        title: "Nữ Hoàng Báo Thù",
        chapters: 350,
        views: 720000,
        badge: "full",
        badgeText: "FULL",
        gradient: "linear-gradient(135deg, #ff6348 0%, #ff9f43 100%)",
        icon: "fa-crown",
        category: "ngon-tinh"
    },
    {
        id: 18,
        title: "Anh Là Của Em",
        chapters: 180,
        views: 650000,
        badge: "full",
        badgeText: "FULL",
        gradient: "linear-gradient(135deg, #7d5fff 0%, #00d2d3 100%)",
        icon: "fa-hand-holding-heart",
        category: "ngon-tinh"
    }
];

// Categories data
const categories = [
    { name: "Ngôn Tình", icon: "fa-heart" },
    { name: "Đồng Nhân", icon: "fa-male" },
    { name: "Đô Thị", icon: "fa-city" },
    { name: "Đam Mỹ", icon: "fa-heart-male" },
    { name: "Huyền Huyễn", icon: "fa-ghost" },
    { name: "Tiên Hiệp", icon: "fa-cloud" },
    { name: "Trọng Sinh", icon: "fa-history" },
    { name: "Hệ Thống", icon: "fa-network-wired" },
    { name: "Sắc Hiệp", icon: "fa-fist-raised" },
    { name: "Xuyên Không", icon: "fa-portal-enter" },
    { name: "Mạt Thế", icon: "fa-biohazard" },
    { name: "Cổ Đại", icon: "fa-landmark" },
    { name: "Quân Sự", icon: "fa-shield-halved" },
    { name: "Convert", icon: "fa-file-arrow-up" },
    { name: "Ngược", icon: "fa-undo" },
    { name: "Linh Dị", icon: "fa-book-skull" }
];

// Ranking data
const rankings = {
    day: [
        { title: "Đế Chế Ngôn Tình", views: 1200000, gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" },
        { title: "Trọng Sinh Chiết Ma", views: 980000, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { title: "Tiên Ma Đích Luyến", views: 870000, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        { title: "Ngôn Tình Sắc Đến Nghiện", views: 750000, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { title: "Xuyên Qua Thế Giới Linh Dị", views: 620000, gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
        { title: "Vợ Yêu Của Tổng Tài", views: 580000, gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
        { title: "Ta Là Đại Lão Tu Tiên", views: 520000, gradient: "linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)" },
        { title: "Linh Vực Chiến Thần", views: 480000, gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
        { title: "Phàm Nhân Tu Tiên", views: 450000, gradient: "linear-gradient(135deg, #ee5a24 0%, #f8b500 100%)" },
        { title: "Hôn Nhân Bí Mật", views: 420000, gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" }
    ],
    week: [
        { title: "Đế Chế Ngôn Tình", views: 8500000, gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" },
        { title: "Trọng Sinh Chiết Ma", views: 7200000, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { title: "Tiên Ma Đích Luyến", views: 6100000, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        { title: "Ta Là Đại Lão Tu Tiên", views: 5800000, gradient: "linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)" },
        { title: "Linh Vực Chiến Thần", views: 5200000, gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
        { title: "Ngôn Tình Sắc Đến Nghiện", views: 4800000, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { title: "Vợ Yêu Của Tổng Tài", views: 4200000, gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
        { title: "Xuyên Qua Thế Giới Linh Dị", views: 3800000, gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
        { title: "Phàm Nhân Tu Tiên", views: 3500000, gradient: "linear-gradient(135deg, #ee5a24 0%, #f8b500 100%)" },
        { title: "Tu Tiên Đạo Tọa", views: 3200000, gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" }
    ],
    month: [
        { title: "Đế Chế Ngôn Tình", views: 35000000, gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" },
        { title: "Trọng Sinh Chiết Ma", views: 28000000, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { title: "Ta Là Đại Lão Tu Tiên", views: 24000000, gradient: "linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)" },
        { title: "Tiên Ma Đích Luyến", views: 21000000, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        { title: "Linh Vực Chiến Thần", views: 19000000, gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
        { title: "Phàm Nhân Tu Tiên", views: 16500000, gradient: "linear-gradient(135deg, #ee5a24 0%, #f8b500 100%)" },
        { title: "Ngôn Tình Sắc Đến Nghiện", views: 14000000, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { title: "Vợ Yêu Của Tổng Tài", views: 12000000, gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
        { title: "Xuyên Qua Thế Giới Linh Dị", views: 10500000, gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
        { title: "Tu Tiên Đạo Tọa", views: 9200000, gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" }
    ]
};

// ===== Utility Functions =====

// Format view count
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(0) + 'K';
    }
    return views.toString();
}

// Create novel card HTML
function createNovelCard(novel) {
    const badgeHTML = novel.badge ? `<span class="novel-badge ${novel.badge}">${novel.badgeText}</span>` : '';
    const updateHTML = novel.updateTime ? `<span class="novel-update"><i class="fas fa-clock"></i> ${novel.updateTime}</span>` : '';

    return `
        <div class="novel-card" data-id="${novel.id}">
            <div class="novel-cover" style="background: ${novel.gradient}">
                <i class="fas ${novel.icon}"></i>
                ${badgeHTML}
            </div>
            <div class="novel-info">
                <h3 class="novel-title">${novel.title}</h3>
                <div class="novel-meta">
                    <span class="novel-chapters"><i class="fas fa-list"></i> ${novel.chapters} chương</span>
                    <span class="novel-views"><i class="fas fa-eye"></i> ${formatViews(novel.views)}</span>
                </div>
                ${updateHTML}
            </div>
        </div>
    `;
}

// Create ranking item HTML
function createRankingItem(item, index) {
    return `
        <li class="ranking-item">
            <span class="ranking-number">${index + 1}</span>
            <div class="ranking-cover" style="background: ${item.gradient}"></div>
            <div class="ranking-info">
                <h4>${item.title}</h4>
                <p>${formatViews(item.views)} lượt xem</p>
            </div>
        </li>
    `;
}

// ===== Render Functions =====

// Render hot novels carousel
function renderHotCarousel() {
    const hotNovels = novels.filter(n => n.badge === 'hot');
    const container = document.getElementById('hotCarousel');
    container.innerHTML = hotNovels.map(createNovelCard).join('');
}

// Render exclusive novels carousel
function renderExclusiveCarousel() {
    const exclusiveNovels = novels.filter(n => n.badge === 'vip');
    const container = document.getElementById('exclusiveCarousel');
    container.innerHTML = exclusiveNovels.map(createNovelCard).join('');
}

// Render categories
function renderCategories() {
    const container = document.getElementById('categoryGrid');
    container.innerHTML = categories.map(cat => `
        <div class="category-item">
            <i class="fas ${cat.icon}"></i>
            <h4>${cat.name}</h4>
        </div>
    `).join('');
}

// Render rankings
function renderRankings() {
    const dayList = document.getElementById('rankingListDay');
    const weekList = document.getElementById('rankingListWeek');
    const monthList = document.getElementById('rankingListMonth');

    dayList.innerHTML = rankings.day.map((item, index) => createRankingItem(item, index)).join('');
    weekList.innerHTML = rankings.week.map((item, index) => createRankingItem(item, index)).join('');
    monthList.innerHTML = rankings.month.map((item, index) => createRankingItem(item, index)).join('');
}

// Render new updates
function renderNewUpdates() {
    const newNovels = novels.filter(n => n.updateTime);
    const container = document.getElementById('newUpdates');
    container.innerHTML = newNovels.map(createNovelCard).join('');
}

// Render completed novels
function renderCompletedNovels() {
    const completed = novels.filter(n => n.badge === 'full');
    const container = document.getElementById('completedNovels');
    container.innerHTML = completed.map(createNovelCard).join('');
}

// ===== Event Handlers =====

// Carousel navigation
function initCarousel(carouselId, prevBtnId, nextBtnId) {
    const track = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const cardWidth = 200; // card width + gap

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth * 3, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth * 3, behavior: 'smooth' });
    });
}

// Tab switching
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            // Show corresponding tab content
            const tabId = tab.dataset.tab;
            document.getElementById('ranking' + tabId.charAt(0).toUpperCase() + tabId.slice(1)).classList.add('active');
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeMobileMenu');

    toggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// Back to top
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Sub nav filter
function initSubNavFilter() {
    const subNavItems = document.querySelectorAll('.sub-nav-menu li');

    subNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            subNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const filter = item.querySelector('a').dataset.filter;
            // Filter novels based on selection (for demonstration)
            console.log('Filtering by:', filter);
        });
    });
}

// Search
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            alert('Tìm kiếm: ' + query);
        }
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ===== Initialize =====

document.addEventListener('DOMContentLoaded', () => {
    renderHotCarousel();
    renderExclusiveCarousel();
    renderCategories();
    renderRankings();
    renderNewUpdates();
    renderCompletedNovels();

    initCarousel('hotCarousel', 'hotPrev', 'hotNext');
    initCarousel('exclusiveCarousel', 'exclusivePrev', 'exclusiveNext');
    initTabs();
    initMobileMenu();
    initBackToTop();
    initSubNavFilter();
    initSearch();
});
