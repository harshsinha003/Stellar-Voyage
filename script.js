let lastScrollTop = 0;
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const heroSectionOffsetTop = heroSection.offsetTop;

  if (scrollTop > heroSectionOffsetTop) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }

  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});

// Handle read more buttons for destination items
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const info = this.parentElement.querySelector('.info');
    if (info.style.display === 'none' || info.style.display === '') {
      info.style.display = 'block';
    } else {
      info.style.display = 'none';
    }
  });
});