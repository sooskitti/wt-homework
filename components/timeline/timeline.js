// Timeline

class Timeline extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div class="me-5 mt-3">
  <div class="ms-5 mb-5">
    <div class="row border-end border-primary border-5 flex-row-reverse m-1">
      <a
        href="#"
        class="p-0 link-offset-2 link-underline link-underline-opacity-0 d-flex flex-nowrap w-25 align-self-end justify-content-end condensed-font fw-normal"
      >
        <span> View all </span>
        <span class="material-symbols-outlined fw-light">
          keyboard_backspace
        </span>
      </a>
      <div class="w-75 display-5 condensed-font fw-normal">
        Financial sector development timeline
      </div>
      <div class="rounded-4 mt-0"></div>
    </div>
    <hr />
    <div class="d-flex flex-row-reverse gap-1 mb-3 d-none d-sm-flex">
      <div class="btn btn-sm btn-outline-secondary btn-prev">
        <span class="material-symbols-outlined fw-light mx-2">
          keyboard_backspace
        </span>
      </div>
      <div class="btn btn-sm btn-outline-secondary btn-next">
        <span
          class="material-symbols-outlined fw-light mx-2"
          style="transform: rotate(180deg)"
        >
          keyboard_backspace
        </span>
      </div>
    </div>
  </div>
  <div
    id="carouselExampleInterval"
    class="carousel container-fliud carousel-dark slide"
  >
    <div
      class="timeline carousel-inner row flex-nowrap inset-shadow ps-4"
    ></div>
  </div>
</div>
`;
  }
}

window.customElements.define("timeline-component", Timeline);

const timeline = document.querySelector(".timeline");

fetch("./timeline.json")
  .then((res) => res.json())
  .then((json) => {
    for (let i = 0; i < json.length; i++) {
      const cardWrapper = document.createElement("div");
      cardWrapper.className =
        "card-wrapper ms-1 p-0 d-flex flex-column col-10 col-sm-5 col-md-4";
      timeline.appendChild(cardWrapper);

      const timelineItem = document.createElement("div");
      timelineItem.className = "px-3 align-self-end";
      cardWrapper.appendChild(timelineItem);

      const card = document.createElement("div");
      card.className = "card carousel-item active border-0 shadow h-100";
      timelineItem.appendChild(card);

      const cardBody = document.createElement("div");
      cardBody.className =
        "card-body h-100 d-flex flex-column justify-content-between";
      card.appendChild(cardBody);

      const cardImage = document.createElement("img");
      cardImage.src = json[i].src;
      cardImage.className = "object-fit-cover card-image";
      cardImage.alt = "Card Image";
      cardBody.appendChild(cardImage);

      const cardTitle = document.createElement("span");
      cardTitle.className = "card-title fw-medium fs-6";
      cardTitle.innerText = json[i].title;
      cardBody.appendChild(cardTitle);

      const cardDescription = document.createElement("span");
      cardDescription.className = "card-text fw-regular fs-7";
      cardDescription.innerText = json[i].description;
      cardBody.appendChild(cardDescription);

      const cardLink = document.createElement("a");
      cardLink.href = "#";
      cardLink.className =
        "card-link link-offset-2 link-underline link-underline-opacity-0 fw-bold d-flex fs-7";
      cardBody.appendChild(cardLink);

      const cardLinkText = document.createElement("span");
      cardLinkText.innerText = "View More";
      cardLink.appendChild(cardLinkText);

      const cardLinkIcon = document.createElement("span");
      cardLinkIcon.className = "material-symbols-outlined me-2 fw-light";
      cardLinkIcon.innerText = "keyboard_backspace";
      cardLink.appendChild(cardLinkIcon);

      const verticalRule = document.createElement("div");
      verticalRule.className = "vr align-self-center mt-2";
      verticalRule.style = "height: 75px";
      cardWrapper.appendChild(verticalRule);

      const dateWrapper = document.createElement("div");
      dateWrapper.className = "d-flex flex-row align-items-center";
      cardWrapper.appendChild(dateWrapper);

      const horizontalRule1 = document.createElement("hr");
      horizontalRule1.className = "w-50";
      horizontalRule1.style = "border-top: dashed 2px";

      const horizontalRule2 = document.createElement("hr");
      horizontalRule2.className = "w-50";
      horizontalRule2.style = "border-top: dashed 2px";

      const horizontalRuleInvisible = document.createElement("hr");
      horizontalRuleInvisible.className = "w-50";
      horizontalRuleInvisible.style = "border-top: 0";

      const dateTextWrapper = document.createElement("div");
      dateTextWrapper.className =
        "fw-medium align-self-center text-center d-flex flex-column";

      const dateMonth = document.createElement("span");
      dateMonth.className = "m-0";
      dateMonth.innerText = json[i].month;
      dateTextWrapper.appendChild(dateMonth);

      const dateYear = document.createElement("span");
      dateYear.className = "m-0 fs-5";
      dateYear.innerText = json[i].year;
      dateTextWrapper.appendChild(dateYear);

      if (i === 0) {
        dateWrapper.appendChild(horizontalRuleInvisible);
        dateWrapper.appendChild(dateTextWrapper);
        dateWrapper.appendChild(horizontalRule2);
      } else if (i === json.length - 1) {
        dateWrapper.appendChild(horizontalRule1);
        dateWrapper.appendChild(dateTextWrapper);
        dateWrapper.appendChild(horizontalRuleInvisible);
      } else {
        dateWrapper.appendChild(horizontalRule1);
        dateWrapper.appendChild(dateTextWrapper);
        dateWrapper.appendChild(horizontalRule2);
      }
    }
    let carouselInner = document.querySelector(".carousel-inner");
    let scrollPosition = carouselInner.scrollLeft;
    console.log(scrollPosition);
    let card = carouselInner.querySelector(".card-wrapper");
    cardMarginleft = Number(
      window.getComputedStyle(card).marginLeft.split("px")[0]
    );
    cardMarginRight = Number(
      window.getComputedStyle(card).marginRight.split("px")[0]
    );
    let cardFullwidth = card.offsetWidth + cardMarginleft + cardMarginRight;

    let touchX;

    document.querySelector(".btn-next").addEventListener("click", function () {
      scrollRight();
    });

    document.querySelector(".btn-prev").addEventListener("click", function () {
      scrollLeft();
    });

    function scrollLeft() {
      scrollPosition -= cardFullwidth;
      carouselInner.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }

    function scrollRight() {
      scrollPosition += cardFullwidth;
      carouselInner.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }

    document
      .querySelector(".carousel")
      .addEventListener("touchstart", function (e) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      });

    document
      .querySelector(".carousel")
      .addEventListener("touchend", function (e) {
        if (e.changedTouches[0].clientX < touchX) scrollRight();
        if (e.changedTouches[0].clientX > touchX) scrollLeft();
      });
  });
