import { DefaultGenerics, FlatActivity } from 'getstream';

export interface AuthUser {
  chatToken: string;
  feedToken: string;
  userId: string;
  username: string;
}

export interface UserData {
  firstname?: string;
  lastname?: string;
  aboutMe?: string;
  location?: string;
  profilePicture?: string;
}

export interface FeedUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  data: UserData;
}

export interface Attachment {
  type: string;
  url: string;
  // url: { duration: string; file: string }; // For video attachments?
}

export interface PostActivity extends FlatActivity<DefaultGenerics> {
  attachments: Attachment[];
  photo?: string;
  videoAssetId?: string;
  videoPlaybackId?: string;
}

export interface ReactionCounts {
  likeCount: number;
  replyCount: number;
}

export interface EnrichedPostActivity extends PostActivity {
  reactionCounts: ReactionCounts;
}

export interface FollowParamModel {
  target: string;
  activity_copy_limit: number;
}

export interface UnfollowParamModel {
  keep_history: boolean;
}

export interface ReplyReactionParamModel {
  activityId: string;
  reply: string;
}

export interface LikeReactionParamModel {
  activityId: string;
}

export interface FileResultModel {
  duration: string;
  file: string;
}

export enum CdnImageResizeStrategy {
  Clip = 'clip',
  Crop = 'crop',
  Scale = 'scale',
  Fill = 'fill',
}

export enum CdnImageCropStrategy {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export interface CdnImageOptions {
  resize: CdnImageResizeStrategy;
  crop: CdnImageCropStrategy;
  width?: number;
  height?: number;
}

export interface PagingModel {
  limit: number;
  offset: number;
}
