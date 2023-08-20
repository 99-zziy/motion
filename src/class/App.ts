import { $ } from "../utils/dom.js";

type RecordId = "image" | "video" | "note" | "task";
type RecordItem = {
  title: string;
  contents: string;
  type: RecordId;
};

const RecordType: Record<RecordId, string> = {
  image: "url",
  video: "url",
  note: "body",
  task: "body",
};

class App {
  private recordId: RecordId = "image";
  private recordList: RecordItem[] = [];

  init = () => {
    this.initEventListeners();
  };

  setRecordId = (e: Event) => {
    const targetElement = e.target as HTMLElement;
    const tabList = targetElement.closest("li");
    if (!tabList) return;

    const recordId = tabList.dataset.recordId as RecordId;
    this.recordId = recordId;
  };

  renderRecordList = () => {
    const recordList = $("#record-list") as HTMLUListElement;
    const template = this.recordList
      .map((recordItem) => {
        if (recordItem.type === "note") {
          return `<li class="record-item"><p class="record-title">${recordItem.title}</p><p class="record-body">${recordItem.contents}</p></div>`;
        }

        if (recordItem.type === "task") {
          return `<li class="record-item"><p class="record-title">${recordItem.title}</p><p class="record-body"> - ${recordItem.contents}</p></div>`;
        }

        if (recordItem.type === "image") {
          return `<li class="record-item"><p class="record-title">${recordItem.title}</p><img class="record-image" src=${recordItem.contents}></img></div>`;
        }

        if (recordItem.type === "video") {
          return `<li class="record-item"><p class="record-title">${recordItem.title}</p><iframe class="record-video" src=${recordItem.contents}></iframe></div>`;
        }
      })
      .join("");

    recordList.innerHTML = template;
  };

  createRecord = (e: Event) => {
    const title = $("#title") as HTMLInputElement;
    const contents = $("#contents") as HTMLInputElement;
    const titleValue = title.value;
    const contentsValue = contents.value;

    if (titleValue && contentsValue) {
      const recordForm = {
        title: titleValue,
        contents: contentsValue,
        type: this.recordId,
      };
      this.recordList.push(recordForm);
      this.renderRecordList();
      this.closeModal();
      title.value = "";
      contents.value = "";
    }
  };

  openModal = (e: Event) => {
    // 먼저 recordId 설정
    this.setRecordId(e);

    // 모달 열기
    const modalElement = $("#modal") as HTMLElement;
    modalElement.style.display = "flex";
    const contentsElement = $("#contents-label") as HTMLLabelElement;
    const existingTextNode = contentsElement.firstChild;

    if (!this.recordId) return;

    // 모달에 recordId에 맞는 내용 보여주기
    if (existingTextNode instanceof Text) {
      existingTextNode.nodeValue = RecordType[this.recordId];
    } else {
      const newTextNode = document.createTextNode(RecordType[this.recordId]);
      contentsElement.appendChild(newTextNode);
    }
  };

  closeModal = () => {
    const modalElement = $("#modal") as HTMLElement;
    modalElement.style.display = "none";
  };

  initEventListeners = () => {
    $("#tab-container")?.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement) {
        this.openModal(e);
      }
    });

    $("#close-button")?.addEventListener("click", () => {
      this.closeModal();
    });

    $("#add-button")?.addEventListener("click", (e) => {
      console.log("?");
      this.createRecord(e);
    });
  };
}

export default App;
