import Buyable from "../domain/Buyable";

export default class Cart {
  private _items: Buyable[] = [];

  add(item: Buyable): void {
    const currentItem = this._items.find((el) => el.id === item.id);

    if (currentItem) {
      if (currentItem.quantity) {
        currentItem.quantity += 1;
      }
    } else {
      this._items.push(item);
    }
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  sum(): number {
    return this.items.reduce( (sum, item) => sum + item.price, 0);
  }

  sumDiscount(discount: number) {
    return this.sum - discount;
  }

  remove(id: number): void {
    this._items = this._items.filter((item) => item.id != id);
  }

  minus(id: number): void {
    const itemId = this._items.find((el) => el.id === id);
    if (itemId && itemId.quantity && itemId.quantity > 1) {
      itemId.quantity -= 1;
    } else {
      this.remove(id);
    }
  }
}