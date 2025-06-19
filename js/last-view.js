
// ====== LAST VIEWED STORAGE ======
window.addEventListener("DOMContentLoaded", () => {
  const maxItems = 5;
  const currentUrl = window.location.pathname;
  const isValidSinglePage = /^\/posts\/(animes|comics|movies|games)\/.+$/.test(currentUrl);

  if (isValidSinglePage) {
    const contentTitle = $(".post-title")?.innerText.trim();
    const contentImage = $("img.post-img")?.getAttribute("src") || "";

    if (contentTitle) {
      const currentPage = {
        url: window.location.href,
        title: contentTitle,
        image: contentImage
      };

      let lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
      lastViewed = lastViewed.filter(item => item.url !== currentPage.url);
      lastViewed.unshift(currentPage);
      lastViewed = lastViewed.slice(0, maxItems);
      localStorage.setItem("lastViewed", JSON.stringify(lastViewed));
    }
  }

  const listEl = $("#last-viewed-list");
  if (listEl) {
    const lastViewed = JSON.parse(localStorage.getItem("lastViewed")) || [];
    listEl.innerHTML = "";

    lastViewed.forEach(item => {
      const li = document.createElement("li");
      li.className = "relative flex flex-1 justify-start items-center group gap-x-0 w-full h-full bg-cover overflow-hidden rounded-md bg-gradient-to-br from-white dark:from-gray-900 from-0% via-gray-50 dark:via-gray-950 via-70% to-gray-300 dark:to-gray-950 to-100%";
      const imageSrc = item.image || "/images/default.png";

      li.innerHTML = `
        <img src="${imageSrc}" alt="gambar-${item.title}" class="w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out object-cover"/>
        <div class="absolute inset-0 w-full h-full flex justify-center items-center opacity-100 transition duration-500 ease-in-out px-4 text-2xl">
          <h2><a href="${item.url}" class="hover:underline break-words line-clamp-2 text-xl font-light dark:font-extralight">${item.title}</a></h2>
        </div>
      `;
      listEl.appendChild(li);
    });
  }
});