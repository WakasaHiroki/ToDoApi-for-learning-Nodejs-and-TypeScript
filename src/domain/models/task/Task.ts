import * as moment from 'moment-timezone';
import * as uuid from 'uuid-with-v6';

export class Task {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _operatedAt: moment.Moment;
  private readonly _isDeleted: boolean;

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get description(): string {
    return this._description;
  }
  get operatedAt(): moment.Moment {
    return this._operatedAt;
  }
  get isDeleted(): boolean {
    return this._isDeleted;
  }

  private constructor(
    id: string,
    title: string,
    description: string,
    operatedAt: moment.Moment,
    isDeleted: boolean
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._operatedAt = moment(operatedAt);
    this._isDeleted = isDeleted;
  }

  static of(
    id: string,
    title: string,
    description: string,
    operatedAt: Date,
    isDeleted: boolean
  ): Task {
    return new Task(id, title, description, moment(operatedAt), isDeleted);
  }

  static create(title: string, description: string): Task {
    return new Task(uuid.v6(), title, description, moment(), false);
  }

  update(title: string, description: string): Task {
    if (this._isDeleted) {
      throw new Error('This task has been deleted.');
    }
    return new Task(this._id, title, description, moment(), false);
  }

  delete(): Task {
    if (this._isDeleted) {
      return this;
    }
    return new Task(this._id, this._title, this._description, moment(), true);
  }
}
