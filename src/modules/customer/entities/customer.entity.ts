import { v4 as uuidv4 } from 'uuid';

export class Customer {
  public readonly id: string;

  constructor(public name: string, public document: number) {
    this.id = uuidv4();
  }
}
