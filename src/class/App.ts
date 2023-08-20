import { $ } from "../utils/dom.js";

type RecordId = "image" | "video" | "note" | "task";

class App {
  init = () => {
    this.initEventListeners();
  };

  createRecord = (e: Event) => {
    const targetElement = e.target as HTMLElement;
    const listItem = targetElement.closest("li");
    if (!listItem) return;

    const recordId = listItem.dataset.recordId;
    if (!recordId) return;

    this.openModal(recordId as RecordId);
  };

  openModal = (recordId: RecordId) => {
    const modalElement = $("#modal") as HTMLElement;
    modalElement.style.display = "block";
  };

  initEventListeners = () => {
    $("#tab-container")?.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement) {
        this.createRecord(e);
      }
    });
  };
}

export default App;
