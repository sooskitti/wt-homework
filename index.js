let isRtl = true;

function changeLanguage() {
  const body = document.querySelector("body");
  if (isRtl) {
    body.classList.remove("direction-rtl");
    body.classList.add("direction-ltr");
    isRtl = false;
  } else {
    body.classList.remove("direction-ltr");
    body.classList.add("direction-rtl");
    isRtl = true;
  }
}
