class DBManager {
  constructor() {
    this.folders = [];
    this.folder = null;
    this.notes = [];
    this.content = "";
    this.note = null;
  }

  setFolders(data) {
    this.folders = data;
  }

  setFolderById(id) {
    const index = DBManager.getIndexById(id, this.folders);

    if (index > -1) {
      this.setFolder(index);
    }
  }

  setFolder(index) {
    this.folder = this.folders[index];
  }

  setNote() {}

  static fromJSON(raw) {
    const db = new DBManager();
    db.copy(raw);

    return db;
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

export default DBManager;
