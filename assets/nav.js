function loadNav() {
  return fetch("nav.html")
    .then((res) => res.text())
    .then((data) => {
      const placeholder = document.getElementById("nav-placeholder");
      const currentPage = window.location.pathname.split("/").pop() || "index.html";

      placeholder.innerHTML = data;

      placeholder.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
          if (
            event.defaultPrevented ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            link.target
          ) {
            return;
          }

          const url = new URL(link.href, window.location.href);
          if (url.origin !== window.location.origin) return;

          event.preventDefault();
          document.body.classList.add("is-leaving");
          window.setTimeout(() => {
            window.location.href = url.href;
          }, 180);
        });
      });

      placeholder.querySelectorAll(".nav-links > li > a").forEach((link) => {
        const href = link.getAttribute("href").split("#")[0];

        if (href === currentPage || (currentPage === "" && href === "index.html")) {
          setTimeout(() => {
            link.classList.add("active");
          }, 200);
        }
      });

      loadFooter();
    });
}

function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder || placeholder.dataset.loaded === "true") return Promise.resolve();

  return fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      placeholder.innerHTML = data;
      placeholder.dataset.loaded = "true";
    });
}
