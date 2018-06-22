const printArea = document.querySelector("#content");

const dropdown = () => {
  const component = document.createElement("div");

  const input = createInput();
  const dropdown = showDropdown();

  component.appendChild(input);
  component.appendChild(dropdown);
  printArea.appendChild(component);
};

const createInput = () => {
  // Creates the input outline
  const input = document.createElement("div");
  input.classList = "input";
  input.addEventListener("click", toggleDropdown);

  // Creates the input placeholder content
  const inputPlaceholder = document.createElement("div");
  inputPlaceholder.classList = "input__placeholder";

  const placeholder = document.createElement("p");
  placeholder.textContent = "Select user";
  placeholder.classList.add('placeholder')

  // Appends the placeholder and chevron (stored in assets.js)
  inputPlaceholder.appendChild(placeholder);
  inputPlaceholder.appendChild(dropdownIcon());
  input.appendChild(inputPlaceholder);

  return input;
};

const showDropdown = () => {
  const structure = document.createElement("div");
  structure.classList.add("structure", "hide");

  users.forEach(user => {
    const { id, name, title } = user;
    const option = document.createElement("div");
    option.addEventListener("click", () => selectOption(name));
    option.setAttribute("id", id);

    const n = document.createElement("h5");
    n.textContent = name;

    const t = document.createElement("p");
    t.textContent = `(${title})`;

    option.appendChild(n);
    option.appendChild(t);
    structure.appendChild(option);
  });
  return structure;
};

const toggleDropdown = () => {
  const dropdown = document.querySelector(".structure");
  dropdown.classList.toggle("hide");

  const input = document.querySelector(".input");
  input.classList.toggle("input__active");
};

const selectOption = (name) => {
  const text = document.querySelector('.placeholder');
  text.textContent = name;
  text.classList.add('input__selected')
  toggleDropdown();
};

dropdown();
