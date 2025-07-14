document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedback-form");
  const charCount = document.getElementById("char-count");
  const comments = document.getElementById("comments");
  const feedbackDisplay = document.getElementById("feedback-display");

  // Real-time character count
  comments.addEventListener("input", function () {
    charCount.textContent = `Characters: ${comments.value.length}`;
  });

  // Tooltip handling with delegation
  document.querySelector("form").addEventListener("mouseover", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = e.target.title;
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
      document.body.appendChild(tooltip);
      tooltip.style.display = "block";
      e.target._tooltip = tooltip;
    }
  });

  document.querySelector("form").addEventListener("mouseout", function (e) {
    if (e.target._tooltip) {
      e.target._tooltip.remove();
      e.target._tooltip = null;
    }
  });

  // Form submission with validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const comment = comments.value.trim();

    if (!name || !email || !comment) {
      alert("All fields must be filled out.");
      return;
    }

    const entry = document.createElement("div");
    entry.className = "feedback-entry";
    entry.innerHTML = `<strong>${name}</strong> (${email}):<br>${comment}`;
    feedbackDisplay.appendChild(entry);

    form.reset();
    charCount.textContent = "Characters: 0";
  });

  // Stop background clicks from affecting form events
  document.body.addEventListener("click", function (e) {
    // Prevent bubbling outside form
    if (form.contains(e.target)) {
      e.stopPropagation();
    }
  });
});
