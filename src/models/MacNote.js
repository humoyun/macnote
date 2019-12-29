import EventEmitter from "./EventEmitter.js";

class Macnote extends EventEmitter {
  constructor() {
    super();
    this.folders = [];
    this.folder = null;
    this.notes = [];
    this.note = null;
  }
}

export default Macnote;
