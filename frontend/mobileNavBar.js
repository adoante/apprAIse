const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent the click from bubbling to the document
  sidebar.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);

  if (!isClickInsideSidebar && !isClickOnToggle) {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});