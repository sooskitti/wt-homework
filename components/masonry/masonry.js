// Masonry

class Masonry extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div class="container-fluid h-100 w-100 p-3 align-content-start">
        <div class="row flex-column-reverse h-100 w-75 flex-wrap g-0 align-content-start masonry"
        ></div>
    </div>`;
  }
}

window.customElements.define("masonry-component", Masonry);

fetch("./pictures.json")
  .then((res) => res.json())
  .then((json) => {
    const masonry = document.querySelector(".masonry");
    for (let i = 0; i < json.length; i++) {
      const el = document.createElement("img");
      el.src = json[i].src;
      el.alt = "Image";
      el.className =
        "masonry-img flex-grow-1 col-5 col-sm-2 rounded-4 m-1 object-fit-cover img-fluid";
      masonry.appendChild(el);
    }
  });
