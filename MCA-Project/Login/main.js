document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const rememberCheckbox = document.querySelector('input[type="checkbox"]');
  const loginForm = document.querySelector("form");
  const toggleIcon = document.querySelector(".toggle-pass");
  const errorMsg = document.getElementById("password-error");

  // Load remembered credentials
  if (localStorage.getItem("rememberedEmail")) {
    emailInput.value = localStorage.getItem("rememberedEmail");
    rememberCheckbox.checked = true;
  }

  // Toggle show/hide password
  toggleIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
      toggleIcon.style.color = "#2b4eff";
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
      toggleIcon.style.color = "#777";
    }
  });

  // Password validation
  function isValidPassword(password) {
    const minLength = /.{8,}/;
    const hasLetter = /[A-Za-z]/;
    const hasNumber = /\d/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasLetter.test(password) &&
      hasNumber.test(password) &&
      hasSpecial.test(password)
    );
  }

  // Handle form submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
      alert("Please fill in both fields.");
      return;
    }

    if (!isValidPassword(password)) {
      errorMsg.style.display = "block";
      errorMsg.textContent =
        "Password must be at least 8 characters and include a letter, number, and special character.";
      return;
    } else {
      errorMsg.style.display = "none";
    }

    // Save email if 'Remember Password' checked
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    // Simulate login success
    alert(`Login Successful!\nWelcome, ${email}`);
    loginForm.reset();
  });
});
