class Manager {
  constructor() {
    this.folders = [];
    this.notes = [];
    this.content = "";
    this.folder = null;
    this.note = null;
  }

  setFolders(data) {
    this.folders = data;
  }

  setFolder() {}

  setNote() {}

  static fromJSON(raw) {
    const memo = new MemoManager();
    memo.copy(raw);

    return memo;
  }

  static copy(data) {
    return data && JSON.parse(JSON.stringify(data));
  }

  static getIndexById(id, list) {
    if (!id && !Array.isArray(list))
      throw new Error("[ error in getIndexById ]");

    for (let i = 0; i < list.length; i += 1) {
      if (id === list[i].id) return i;
    }
    return -1;
  }
}
