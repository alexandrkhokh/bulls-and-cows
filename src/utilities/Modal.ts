import createEl from "./createEl.ts";

export default function createModal(
  content: HTMLElement,
  confirmButton?: HTMLButtonElement,
): () => void {
  const previousFocus = document.activeElement;
  const previousOverflow = document.body.style.overflow;

  const modalOverlay = createEl({
    className: "modal-overlay",
  });

  const modalContainer = createEl({
    className: "modal-container",
    role: "dialog",
    "aria-modal": "true",
  });

  const modalContent = createEl({
    className: "modal-content",
  });

  const buttonsContainer = createEl({
    className: "flex-sb",
  });

  const cancelButton = createEl(
    {
      tag: "button",
      type: "button",
      className: "btn",
    },
    ["Close"],
  );

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
    }
  };

  const close = () => {
    document.removeEventListener("keydown", onKeydown);
    removeModalOverlay(modalOverlay, previousOverflow);

    if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
      previousFocus.focus();
    }
  };

  document.addEventListener("keydown", onKeydown);

  cancelButton.addEventListener("click", close);

  modalContainer.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalOverlay.addEventListener("click", close);

  buttonsContainer.append(cancelButton);
  if (confirmButton) {
    confirmButton.addEventListener("click", close);
    buttonsContainer.append(confirmButton);
  }
  modalContent.append(content, buttonsContainer);
  modalContainer.append(modalContent);
  modalOverlay.append(modalContainer);
  document.body.style.overflow = "hidden";

  document.body.append(modalOverlay);
  cancelButton.focus();

  return close;
}

function removeModalOverlay(el: HTMLElement, previousOverflow: string) {
  if (document.body.contains(el)) {
    document.body.removeChild(el);
    document.body.style.overflow = previousOverflow;
  }
}
