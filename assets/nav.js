function loadNav() {
  return fetch("nav.html")
    .then((res) => res.text())
    .then((data) => {
      const placeholder = document.getElementById("nav-placeholder");
      const currentPage = window.location.pathname.split("/").pop() || "index.html";

      placeholder.innerHTML = data;

      placeholder.querySelectorAll(".nav-links > li > a").forEach((link) => {
        const href = link.getAttribute("href").split("#")[0];

        if (href === currentPage || (currentPage === "" && href === "index.html")) {
          link.classList.add("active");
        }
      });
    });
}
