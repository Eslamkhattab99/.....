window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');

    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        tab_switcher.addEventListener('click', () => {
            document.querySelector('.tabs .tab.is-active').classList.remove('is-active');
            tab_switcher.parentNode.classList.add('is-active');

            SwitchPage(page_id);
        });
    }
}

function SwitchPage (page_id) {
    console.log(page_id);

    const current_page = document.querySelector('.pages .page.is-active');
    current_page.classList.remove('is-active');

    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
}
let picturePreview = document.querySelector(".imagePreview");
let actionButton = document.querySelector(".action-button");
let fileInput = document.querySelector("input[name='fileInput']");
let fileReader = new FileReader();

const DEFAULT_IMAGE_SRC = "https://www.drupal.org/files/profile_default.png";

actionButton.addEventListener("click", () => {
  if ( picturePreview.src !== DEFAULT_IMAGE_SRC ) {
    resetImage();
  } else {
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  refreshImagePreview();
});

function resetImage() {
  setActionButtonMode("upload");
  picturePreview.src = DEFAULT_IMAGE_SRC;
  fileInput.value = "";
}

function setActionButtonMode(mode) {
  let modes = {
    "upload": function() {
      actionButton.innerText = "Upload avatar";
      actionButton.classList.remove("mode-remove");
      actionButton.classList.add("mode-upload");
    },
    "remove": function() {
      actionButton.innerText = "Remove photo";
      actionButton.classList.remove("mode-upload");
      actionButton.classList.add("mode-remove");
    }
  }
  return (modes[mode]) ? modes[mode]() : console.error("unknown mode");
}

function refreshImagePreview() {
  if ( picturePreview.src !== DEFAULT_IMAGE_SRC ) {
    picturePreview.src = DEFAULT_IMAGE_SRC;
  } else {
    if ( fileInput.files && fileInput.files.length > 0 ){
      fileReader.readAsDataURL(fileInput.files[0]);
      fileReader.onload = (e) => {
        picturePreview.src = e.target.result;
        setActionButtonMode("remove");
      }
    }
  }
}

refreshImagePreview();