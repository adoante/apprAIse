document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".dropdown-btn").forEach(button => {
      button.addEventListener("click", function(event) {
          event.stopPropagation(); // Prevents event from bubbling to document

          let content = this.nextElementSibling;
          let isOpen = content.style.maxHeight;

          // Close all dropdowns first
          document.querySelectorAll(".dropdown-content").forEach(drop => {
              drop.style.maxHeight = null;
          });

          // Toggle only the clicked one
          if (!isOpen) {
              content.style.maxHeight = content.scrollHeight + "px";
          }
      });
  });

  // Close dropdowns if clicking outside
  document.addEventListener("click", function() {
      document.querySelectorAll(".dropdown-content").forEach(drop => {
          drop.style.maxHeight = null;
      });
  });
});
