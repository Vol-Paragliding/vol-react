export interface FeedUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  data: {
    firstname: string;
    lastname: string;
    username: string;
    aboutMe: string;
    profilePicture?: string;
    website?: string;
    location?: string;
  }
}

export interface ReactionCounts {
  likeCount: number;
  replyCount: number;
}

export interface PostActivity {
  actor: string;
  verb: string;
  object: string;
  tweetPhoto?: string;
  tweetMovieAssetId?: string;
  tweetMoviePlaybackId?: string;
}

export interface PostActivityResponse {
  actor: string;
  verb: string;
  duration: string;
  foreign_id: string;
  id: string;
  object: string;
  origin: string;
  target: string;
}

export interface EnrichedPostActivity {
  id: string;
  actor: FeedUser;
  verb: string;
  object: string;
  time: Date;
  tweetPhoto?: string;
  tweetMovieAssetId?: string;
  tweetMoviePlaybackId?: string;
  reactionCounts: ReactionCounts;
}
