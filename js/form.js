document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-request");
  const phoneInput = document.querySelector("#phone");
  const onlyCountries = ["it", "ro"];

  phoneInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  const iti = window.intlTelInput(phoneInput, {
    separateDialCode: true,
    nationalMode: false,
    initialCountry: "it",
    onlyCountries: onlyCountries,
    utilsScript: "/js/utils.js",
  });

  const validateField = (input, validationFn) => {
    const formField = input.closest(".form_field"); // Находим родительский элемент с классом .form_field
    if (validationFn(input.value.trim())) {
      formField.classList.remove("error");
      formField.classList.add("success");
    } else {
      formField.classList.remove("success");
      formField.classList.add("error");
    }
  };

  const isRequired = (value) => value !== "";
  const isBetween = (length, min, max) => length >= min && length <= max;
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = () => iti.isValidNumber();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstNameEl = form.elements.f_name;
    const lastNameEl = form.elements.l_name;
    const emailEl = form.elements.email;
    const phoneEl = form.elements.phone;

    validateField(
      firstNameEl,
      (value) => isRequired(value) && isBetween(value.length, 2, 30)
    );
    validateField(
      lastNameEl,
      (value) => isRequired(value) && isBetween(value.length, 2, 30)
    );
    validateField(emailEl, isEmailValid);
    validateField(phoneEl, () => isRequired(phoneEl.value) && isValidPhone());

    if (form.querySelectorAll(".error").length === 0) {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      console.log(data);

      form.reset();
      form.querySelectorAll(".form_field").forEach((field) => {
        field.classList.remove("error", "success");
      });
    }
  });
});
