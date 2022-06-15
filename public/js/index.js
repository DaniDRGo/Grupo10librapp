let menu = document.getElementById("menu-hamburguesa");
let navbar = document.getElementById("navbar");

menu.addEventListener("click", function () {
  console.log("click");
  navbar.classList.toggle("menu-visible");
});


