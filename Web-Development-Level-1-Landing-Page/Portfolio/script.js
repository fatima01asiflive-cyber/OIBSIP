
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});


// Close mobile menu after clicking a link

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });

});
