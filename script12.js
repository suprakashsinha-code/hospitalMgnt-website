document.addEventListener("DOMContentLoaded", function () {

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
       PROGRESS BUTTON SCROLL
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
       SCROLL EFFECTS (LIGHTWEIGHT)
    ========================= */
    let ticking = false;

    window.addEventListener("scroll", function () {

        if (!ticking) {
            window.requestAnimationFrame(() => {

                const scrolled = window.scrollY;

                /* Navbar shrink */
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
    



});
