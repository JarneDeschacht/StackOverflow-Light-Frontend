import { User } from './user.model';

export class Answer {
  private _answerId: number;

  constructor(
    private _body: string,
    private _user: User,
    private _creationTime = new Date()
  ) {}

  static fromJSON(json: any): Answer {
    const answ = new Answer(
      json.body,
      User.fromJSON(json.user),
      json.creationTime
    );
    answ._answerId = json.answerId;
    return answ;
  }
  toJSON(): any {
    return {
      body: this._body,
      userId: this._user.userId
    };
  }
  get answerId(): number {
    return this._answerId;
  }
  get body(): string {
    return this._body;
  }
  get user(): User {
    return this._user;
  }
  get creationTime(): Date {
    return this._creationTime;
  }
}
