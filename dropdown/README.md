# Developing custom dropdowns with vanilla JS & CSS (In under 5 minutes)
Throughout the last three months at Nashville Software School, I built a lot of projects. Like a lot a lot. From real-time messaging to task lists to project management, building micro-products helped introduce and reinforce the various languages & frameworks we were exposed to.

Regardless of the project, one theme stayed true: I strongly dislike default input boxes.
As a UX designer, I want product interactions, no matter how small, to feel intentional, intuitive, and consistent, and to me, default input boxes always feel clunky, outdated, and random.

So, as soon as I got started at school, I wanted to invest the time to fully understand how to build components with vanilla CSS, ranging from dropdowns to modals, to avoid using defaults or relying on frameworks like Bootstrap or Materialize.

Now that I have experience with JavaScript and CSS frameworks/libraries, I probably wouldn't develop this in vanilla JS, but I wanted to write this to show that it's not as hard as it might look. So, get ready to drop it like it's hot and build a dropdown from scratch.

Here's a sample of the final product:

[image]: https://cdn-images-1.medium.com/max/1600/1*Ft5vqfJum_1OOVCdMqWmag.gif

### HTML (index.html)
Since we'll be using JS to dynamically create the input/dropdown, our HTML is pretty bare bones. I used two separate files for both CSS & JS because:
* For CSS, I like separating element styles with class-specific ones
* For JS, one file stores the data and icons to declutter the dropdown.js file

```
<!DOCTYPE html>
<head>
    <link href='styles/global.css' rel='stylesheet'>
    <link href='styles/dropdown.css' rel='stylesheet'>
</head>

<body>
    <div id='content'></div>

    <script src='scripts/assets.js'></script>
    <script src='scripts/dropdown.js'></script>
</body>

</html>
```

###  Step 1 - Create the structure & reference the DOM
1. Globally, I get a reference to the area in index.html that I want to eventually append the dropdown to
1. The function dropdown creates the <div> that will house the entire dropdown, and I call the two other functions that build the two primary aspects of the dropdown (input field and dropdown)
1. Everything is appended to the DOM

```
const printArea = document.querySelector("#content");

const dropdown = () => {
  const component = document.createElement("div");

  const input = createInput();
  const dropdown = showDropdown();

  component.appendChild(input);
  component.appendChild(dropdown);
  printArea.appendChild(component);
}
```

### Step 2- Create the fake input box
This function creates a <div> that simulates an input field that includes three key things
1. Placeholder text - this really makes it feel like an input box and will eventually be used to swap in/out the selected dropdown option
1. Chevron - a key UX component to let the user know that the input field is a dropdown not a text one. I used an SVG (which was housed in a function, which is why dropdownIcon() was called) for this because it loads instantly, adding to the overall UX
1. Event - the most important one is that when you click the input box, you want it to do something (duh), so you need to add an event listener on it. In this case, when you click the input <div>, the function toggleDropdown is called (see below for more details)

Then, everything is appended to the input <div>and returned for the dropdown function.

```
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
```

### Step 3- Create the dropdown w/ options
This function builds out the dropdown by:
1. Creating the structure<div>that serves as the dropdown structure
1. Iterating over the array of objects that is storing my user data, which looks like: const user = [ {id: 1, name: 'Michael Scott', title: 'Regional Manager'}, {id: 2, name: 'Pam Beesly', title 'Receptionist'}and creating a unique <div> for each option.
1. Each option is given an event listener, which makes it interactive when a user clicks on an option. In this case, I pass the name property to the selectOption function, but you could pass the entire user object if you want to as well (if you're feeling crazy)
1. Since I am just using vanilla JS, I give the dropdown the hide class, which is display:none by default. Later, when a user clicks on the input, this will toggle the show/hide via the toggleDropdown function

Then, each option is appended the structure <div>, which is returned for the dropdown function
Note: line 6 uses de-structuring, which is a neat ES6 trick for turning object properties into variables to make it easier to utilize them later. So, instead of having to write user.name to access "Michael Scott", I can just write name because it was de-restructured.

```
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
```

### Step 4- Show/hide the dropdown (1st click event)
When the user clicks the input field, the event listener triggers the toggleDropdown function, which:
1. Removes the hide class from the dropdown (which shows it)
1. Adds the class input__active to the input box, which simulates it having the :active or :focus pseudo CSS selector classes

```
const toggleDropdown = () => {
  const dropdown = document.querySelector(".structure");
  dropdown.classList.toggle("hide");

  const input = document.querySelector(".input");
  input.classList.toggle("input__active");
};
```

### Step 5- Gathers & shows dropdown selection (2nd click event)
When the dropdown is active, and the user selects an option, this function:
1.  Is passed the argument name and replaces the input placeholder text with the selected name
1. Calls the toggleDropdown function, which hides the dropdown and removes the input__active class from the input box
```
const selectOption = (name) => {
  const text = document.querySelector('.placeholder');
  text.textContent = name;
  text.classList.add('input__selected')
  toggleDropdown();
};
```

### Step 6 - Setup global styles (global.css)
For most projects I use Sass, but since this is a small project, I just stuck with vanilla CSS and utilized variables to streamline the process.

Quick note: I don't typically apply global styles using the * selector, but when I do, it's resetting the margin to 0 for all elements (makes it much easier to write CSS later) and setting box sizing as border-box (which is the beez neez).

```
* {
  margin: 0;
  box-sizing: border-box;
}

:root {
  --colorPrimaryDark: #0b132b;
  --colorPrimaryLight: #494f61;
  --colorPlaceholder: #9b9fa8;
  --colorBackground: #eeeff0;
  --colorBorder: #cdcfd3;
  --colorAccent: #003bde;
  --gutter: 0 16px;
  --border: 1.5px solid var(--colorBorder);
  --radius: 3px;
}

h5,
p {
  font-family: "Lato";
  font-size: 14px;
}

#content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: var(--colorBackground);
}
```

### Step 7- Add dropdown/input styling
Utilizing flexbox and your pre-defined variables, style the dropdown to bring it to life. The following is the CSS that I used for building the example at the top of the page.

```
/* Input styling */
.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: var(--border);
  border-radius: var(--radius);
  height: 36px;
  width: 280px;
  margin-top: 250px;
  padding: var(--gutter);
  background-color: white;
}

.input__active {
  border-color: var(--colorAccent);
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.input__placeholder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.input:hover {
  cursor: pointer;
}

.placeholder {
  color: var(--colorPlaceholder);
}

.input__selected {
  color: var(--colorPrimaryDark);
}

/* Dropdown styling */
.structure {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 200px;
  width: 280px;
  overflow: scroll;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.structure > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
}

.structure > div:hover {
  background-color: var(--colorAccent);
  color: white;
  cursor: pointer;
}

.structure > div > h5 {
  font-weight: 600;
  margin-right: 4px;
}

.structure > div > p {
  font-weight: 400;
  font-size: 13px;
  color: var(--colorPlaceholder);
}

.hide {
  display: none;
}
```

---

For me, building out custom components like dropdowns and modals made me realize that CSS isn't as intimidating as it's made to be, and I did not have to rely on frameworks like Bootstrap as much as I thought.
