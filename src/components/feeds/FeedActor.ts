enum ActorType {
  SA = "SA",
  SR = "SR",
  SO = "SO",
  SU = "SU",
}

interface Refable {
  ref(): string;
}

export class FeedActor implements Refable {
  type: ActorType;
  id: string;

  constructor(type: ActorType, id: string) {
    this.type = type;
    this.id = id;
  }

  ref(): string {
    return this.type + this.id;
  }
}

