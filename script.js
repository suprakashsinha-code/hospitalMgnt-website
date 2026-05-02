document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       INIT ICONS
    ========================= */
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    /* =========================
       ELEMENTS
    ========================= */
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    const navbar = document.querySelector(".navbar");

    const navButtons = document.querySelectorAll(".nav-btn");
    const progressBar = document.querySelector(".progress-bar");

    const doctorGrid = document.querySelector(".doctor-grid");

    const serviceItems = document.querySelectorAll('.service-item');
    const iphoneMockup = document.querySelector('.iphone-mockup');
    const iphoneContainer = document.querySelector('.iphone-container');
    const cards = document.querySelectorAll('.testimonial-card');
    const dynamicIsland = document.querySelector('.dynamic-island');

    /* =========================
       SIDEBAR
    ========================= */
    function toggleSidebar() {
        if (!sidebar || !overlay) return;

        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");

        document.body.style.overflow =
            sidebar.classList.contains("active") ? "hidden" : "auto";
    }

    menuToggle?.addEventListener("click", toggleSidebar);
    closeSidebar?.addEventListener("click", toggleSidebar);
    overlay?.addEventListener("click", toggleSidebar);

    /* =========================
       NAV LINKS ACTIVE
    ========================= */
    const navLinks = document.querySelectorAll(".nav-links a, .sidebar-nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            if (sidebar?.classList.contains("active")) {
                toggleSidebar();
            }
        });
    });

    /* =========================
       SERVICE ITEM TOGGLE
    ========================= */
    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            serviceItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    /* =========================
       PHONE PARALLAX EFFECT
    ========================= */
    if (iphoneContainer && iphoneMockup && window.innerWidth > 992) {
        iphoneContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = iphoneContainer.getBoundingClientRect();

            const moveX = (e.clientX - (left + width / 2)) / 40;
            const moveY = (e.clientY - (top + height / 2)) / 40;

            iphoneMockup.style.transform =
                `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });

        iphoneContainer.addEventListener('mouseleave', () => {
            iphoneMockup.style.transform = `rotateY(-10deg) rotateX(5deg)`;
        });
    }

    /* =========================
       TESTIMONIAL SCROLL REVEAL
    ========================= */
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

        cards.forEach(card => revealObserver.observe(card));
    }

    /* =========================
       DOCTOR SCROLL + PROGRESS
    ========================= */
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            if (!doctorGrid) return;

            const scrollAmount = doctorGrid.clientWidth * 0.8;

            doctorGrid.scrollBy({
                left: btn.classList.contains("next")
                    ? scrollAmount
                    : -scrollAmount,
                behavior: "smooth"
            });

            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 100);
        });
    });

    doctorGrid?.addEventListener("scroll", () => {
        const scrollLeft = doctorGrid.scrollLeft;
        const scrollWidth = doctorGrid.scrollWidth - doctorGrid.clientWidth;

        const scrolled = (scrollLeft / scrollWidth) * 100;

        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }
    });

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */
    let ticking = false;

    window.addEventListener("scroll", () => {

        if (!ticking) {
            window.requestAnimationFrame(() => {

                const scrolled = window.scrollY;

                if (navbar) {
                    const small = scrolled > 20;

                    navbar.style.boxShadow = small
                        ? "0 4px 20px rgba(0,0,0,0.08)"
                        : "none";

                    navbar.style.height = small ? "70px" : "80px";
                }

                ticking = false;
            });

            ticking = true;
        }
    });

    /* =========================
       DYNAMIC ISLAND ANIMATION
    ========================= */
    if (dynamicIsland) {
        setInterval(() => {
            dynamicIsland.style.width = "120px";

            setTimeout(() => {
                dynamicIsland.style.width = "90px";
            }, 2000);

        }, 8000);
    }

});
