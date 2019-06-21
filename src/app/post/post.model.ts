import { User } from './user.model';
import { Answer } from './answer.model';
import { Vote } from './vote.model';

export class Post {
  private _postId: number;

  constructor(
    private _title: string,
    private _body: string,
    private _owner: User,
    private _votes = new Array<Vote>(),
    private _answers = new Array<Answer>(),
    private _score: number,
    private _creationTime = new Date()
  ) {}
  static fromJSON(json: any): Post {
    const post = new Post(
      json.title,
      json.body,
      User.fromJSON(json.owner),
      json.votes.map(Vote.fromJSON),
      json.answers.map(Answer.fromJSON),
      json.score,
      json.creationTime
    );
    post._postId = json.postId;
    return post;
  }
  toJSON(): any {
    return {
      title: this._title,
      body: this._body,
      ownerId: this._owner.userId
    };
  }
  get postId(): number {
    return this._postId;
  }
  get body(): string {
    return this._body;
  }
  get title(): string {
    return this._title;
  }
  get votes(): Array<Vote> {
    return this._votes;
  }
  get answers(): Array<Answer> {
    return this._answers;
  }
  get score(): number {
    return this._score;
  }
  get creationTime(): Date {
    return this._creationTime;
  }
  get owner(): User {
    return this._owner;
  }
  set score(newscore: number) {
    this._score = newscore;
  }
  addAnswer(body: string, user: User) {
    this._answers.push(new Answer(body, user));
  }
  addVote(type: number, user: User) {
    this._votes.push(new Vote(user, type));
  }
}
