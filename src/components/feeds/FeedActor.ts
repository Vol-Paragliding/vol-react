enum ActorType {
  SA = "SA", // Stream activity
  SR = "SR", // Stream reaction
  SO = "SO", // Stream object for a collection
  SU = "SU"  // Stream User
}

interface Refable {
  ref(): string;
}

const createFeedActor = (type: ActorType, id: string): Refable => {
  return {
    ref: () => `${type}${id}`,
  };
};

export { ActorType, createFeedActor };
