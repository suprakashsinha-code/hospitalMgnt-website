document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       1. Initialize Lucide Icons
    =============================== */
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    /* ===============================
       2. Elements
    =============================== */
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const navbar = document.querySelector(".navbar");
    const headline = document.querySelector(".hero-headline");
    const blobs = document.querySelectorAll(".liquid-blob");
    const heroImage = document.querySelector(".hero-bg-image");

    /* ===============================
       3. Sidebar Toggle
    =============================== */
    function toggleSidebar() {
        if (!sidebar || !overlay) return;

        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");

        document.body.style.overflow =
            sidebar.classList.contains("active") ? "hidden" : "auto";
    }

    if (menuToggle) menuToggle.addEventListener("click", toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener("click", toggleSidebar);
    if (overlay) overlay.addEventListener("click", toggleSidebar);

    /* ===============================
       4. Navigation Active State
    =============================== */
    const navLinks = document.querySelectorAll(".nav-links a, .sidebar-nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            if (sidebar && sidebar.classList.contains("active")) {
                toggleSidebar();
            }
        });
    });

    /* ===============================
       5. Button Click Effect
    =============================== */
    document.querySelectorAll(".btn-primary").forEach(btn => {
        btn.addEventListener("mousedown", () => {
            btn.style.transform = "scale(0.95)";
        });

        btn.addEventListener("mouseup", () => {
            btn.style.transform = "scale(1)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "scale(1)";
        });
    });

    /* ===============================
       6. Hero Image Animation
    =============================== */
    if (heroImage) {
        heroImage.style.opacity = "0";
        heroImage.style.transform = "translateY(20px)";
        heroImage.style.transition = "all 1s ease-out";

        setTimeout(() => {
            heroImage.style.opacity = "1";
            heroImage.style.transform = "translateY(0)";
        }, 100);
    }

    /* ===============================
       7. Scroll Effects
    =============================== */
    window.addEventListener("scroll", function () {
        const scrolled = window.scrollY;

        // Navbar
        if (navbar) {
            if (scrolled > 20) {
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
                navbar.style.height = "70px";
            } else {
                navbar.style.boxShadow = "none";
                navbar.style.height = "80px";
            }
        }

        // Headline
        // Headline
if (headline && scrolled < 800) {
    headline.style.transform = `translateY(${scrolled * 0.1}px)`;

    let opacity = 1 - scrolled / 1200; // slower fade
    if (opacity < 0.6) opacity = 0.6;  // minimum visibility

    headline.style.opacity = opacity;
}

        // Blobs
        blobs.forEach((blob, i) => {
            const speed = (i + 1) * 0.05;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    /* ===============================
       8. Stats Animation
    =============================== */
    const stats = document.querySelectorAll(".stat-item");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        stats.forEach((stat, index) => {
            stat.style.opacity = "0";
            stat.style.transform = "translateY(30px)";
            stat.style.transition = `all 0.8s ease ${index * 0.1}s`;
            observer.observe(stat);
        });
    }
});