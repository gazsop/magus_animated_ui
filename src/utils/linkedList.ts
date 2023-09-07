type TTypeOfLinkedList = "circular" | "plain";

interface ILinkedListNode<T> {
  next: linkedListNode<T> | null;
  prev: linkedListNode<T> | null;
  val: T;
  index: number;
  id: string;
}

export class linkedList<T> {
  protected head: linkedListNode<T>;
  protected nodeArray: linkedListNode<T>[] = [];
  protected type: TTypeOfLinkedList = "plain";

  constructor(initArray: T[], type: TTypeOfLinkedList = "plain") {
    // console.log(type);
    // console.log(initArray);
    this.type = type;
    initArray
      .filter((item) => item || item === 0)
      .map((item: T, index) => {
        this.nodeArray.push(new linkedListNode<T>(item, index));
      });
    this.head = this.nodeArray[0];
    this.reinitializeNodes();
  }

  get length() {
    return this.nodeArray.length;
  }

  get getType(){
    return this.type;
  }

  get getIndex(){
    return (this.nodeArray.findIndex( node => node === this.getHead));
  }

  public deleteNode(deleteValue: {
    node?: linkedListNode<T> | null;
    val?: T;
    index?: number;
  }) {
    if (deleteValue.val)
      this.nodeArray = [
        ...this.nodeArray.filter((node) => node.val !== deleteValue.val),
      ];
    else if (deleteValue.index)
      this.nodeArray = [
        ...this.nodeArray.filter((_, index) => index !== deleteValue.index),
      ];
    else if (deleteValue.node) {
      this.nodeArray = [
        ...this.nodeArray.filter((node) => node !== deleteValue.node),
      ];
      this.head === deleteValue.node && (this.head = this.nodeArray[0]);
    }
    this.reinitializeNodes();
    return this;
  }

  public appendNode(newVals: [{ val: T; index: number }]) {
    newVals.map((newVal, newIndex) => {
      const newNodeArrayStart = this.nodeArray.slice(0, newVal.index);
      const newNodeArrayEnd = this.nodeArray.slice(newVal.index, this.length);
      this.nodeArray = [
        ...newNodeArrayStart,
        new linkedListNode<T>(newVal.val, newVal.index),
        ...newNodeArrayEnd,
      ];
    });
    this.reinitializeNodes();
    return this;
  }

  public searchNode(searchParam: { val?: T; index?: number }) {
    if (searchParam.val)
      return this.nodeArray.find((node) => node.val === searchParam.val);
    if (searchParam.index)
      return this.nodeArray.find((_, index) => index === searchParam.index);
  }

  public selectNode(newVal: {
    val?: T;
    index?: number | "next" | "prev";
    node?: linkedListNode<T> | null;
  }) {
    // console.log("newVal", newVal);
    // console.log(this.getHead.val);
    if (
      (newVal.index && newVal.val) ||
      (newVal.val && typeof newVal.val !== typeof this.nodeArray[0].val)
    )
      return this;
    else if (newVal.val)
      this.head =
        this.nodeArray.find((item) => item.val === newVal.val) ?? this.head;
    else if (newVal.index) {
      if (
        typeof newVal.index === "number" &&
        newVal.index < this.length &&
        newVal.index < 0
      )
        this.head = this.nodeArray[newVal.index] ?? this.nodeArray[0];
      else if (newVal.index === "next") this.head = this.head.next ?? this.head;
      else if (newVal.index === "prev") this.head = this.head.prev ?? this.head;
    } else if (newVal.node)
      this.head =
        this.nodeArray.find((node) => node === newVal.node) ?? this.head;
        // console.log(this.getHead.val);
    return this;
  }

  get getHead() {
    return this.head;
  }

  public getAllNodes() {
    return [...this.nodeArray];
  }

  protected reinitializeNodes() {
    if (!this.head)
      for (let index = 0; index < this.length; index++)
        if (this.nodeArray[index]) {
          this.head = this.nodeArray[index];
          break;
        }

    switch (this.type) {
      case "circular":
        this.nodeArray.map((node: linkedListNode<T>, index) => {
          node.next =
            index === this.length - 1
              ? this.nodeArray[0]
              : this.nodeArray[index + 1];
          node.prev =
            index === 0
              ? this.nodeArray[this.length - 1]
              : this.nodeArray[index - 1];
        });
        break;
      default:
        this.nodeArray.map((node: linkedListNode<T>, index) => {
          node.next =
            index === this.length - 1 ? null : this.nodeArray[index + 1];
          node.prev = index === 0 ? null : this.nodeArray[index - 1];
        });
        break;
    }
  }

  public map<K>(callback: (node: linkedListNode<T>) => K): K[] {
    return this.nodeArray.map((node) => callback(node));
  }

  public find(callback: (node: linkedListNode<T>) => boolean) {
    return this.nodeArray.find((node) => callback(node));
  }
}

class linkedListNode<T> implements ILinkedListNode<T> {
  protected _val: T;
  protected _next: linkedListNode<T> | null = null;
  protected _prev: linkedListNode<T> | null = null;
  protected _index: number;
  protected _id = crypto.randomUUID();

  constructor(val: T, index: number) {
    this._val = val;
    this._index = index;
  }

  public get next() {
    return this._next;
  }
  public get prev() {
    return this._prev;
  }
  public get val() {
    return this._val;
  }
  public get index(): number {
    return this._index;
  }
  public get id(): string {
    return this._id;
  }
  
  public set next(newVal) {
    this._next = newVal;
  }
  public set prev(newVal) {
    this._prev = newVal;
  }
  public set val(newVal) {
    this._val = newVal;
  }
  public set index(value: number) {
    this._index = value;
  }
  public set id(value: string) {
  }
}
