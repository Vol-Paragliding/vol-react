export interface FeedUser {
  userId: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  aboutMe: string;
  profilePicture?: string;
  website: string;
  location: string;
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