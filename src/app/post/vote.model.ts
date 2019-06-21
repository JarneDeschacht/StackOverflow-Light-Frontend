import { User } from './user.model';

export class Vote {
  private _voteId: number;

  constructor(
    private _user: User,
    private _voteType: number,
    private _creationTime = new Date()
  ) {}
  static fromJSON(json: any): Vote {
    const vote = new Vote(
      User.fromJSON(json.user),
      json.voteType,
      json.creationTime
    );
    vote._voteId = json.voteId;
    return vote;
  }
  toJSON(): any {
    return {
      userId: this._user.userId,
      voteType: this._voteType
    };
  }
  get voteId(): number {
    return this._voteId;
  }
  get voteType(): number {
    return this._voteType;
  }
  get user(): User {
    return this._user;
  }
  get creationTime(): Date {
    return this._creationTime;
  }
}
