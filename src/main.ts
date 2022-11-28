import "./style.css";

class App {
  appHTML = document.getElementById("app");

  push(element: HTMLElement, position: InsertPosition = "afterend") {
    this.appHTML?.insertAdjacentElement(position, element);
  }

  createElement(element: keyof HTMLElementTagNameMap) {
    return document.createElement(element);
  }
}

class Element {
  el: HTMLElement;
  constructor(el: HTMLElement) {
    this.el = el;
  }

  get element() {
    return this.el;
  }

  push(element: HTMLElement) {
    this.element?.appendChild(element);
    return this;
  }

  style(styleProp: string, value: string) {
    this.el.style.setProperty(styleProp, value);
    return this;
  }
}
const app = new App();

const heading1 = new Element(app.createElement("h1"));
const noteForm = new Element(app.createElement("form"));
const noteInput = new Element(app.createElement("input"));
const addNoteBtn = new Element(app.createElement("button"));
const notesContainer = new Element(app.createElement("ul"));

heading1.element.textContent = "Notebook";
heading1.style("color", "white").style("font-size", "20px");

addNoteBtn.element.textContent = "Add+";
addNoteBtn.style("padding-block", "0.6rem").style("margin-left", "5px");

noteInput.style("padding", "10px 1rem").element.setAttribute("placeholder", "Enter note");

const container = new Element(app.createElement("div"));
container.style("border", "2px solid white");
container.style("height", "max-content");
container.style("padding", "1rem");
container.push(heading1.element).push(noteForm.element).push(notesContainer.element);
noteForm.push(noteInput.element).push(addNoteBtn.element);

noteForm.element.onsubmit = (e) => {
  e.preventDefault();
  const note = noteInput.element.value;
  const noteEl = new Element(app.createElement("li"));
  noteEl.element.textContent = note;
  notesContainer.push(noteEl.element);
  noteInput.element.value = "";
};

app.push(container.element);
