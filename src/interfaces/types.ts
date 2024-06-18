import { DefaultGenerics, EnrichedActivity, EnrichedUser } from 'getstream';

interface BaseAttachment {
  type: string;
}

export interface ImageAttachment extends BaseAttachment {
  type: "image";
  url: string;
}

export interface VideoAttachment extends BaseAttachment {
  type: "video";
  url: string;
}

export interface IGCFileAttachment extends BaseAttachment {
  type: "igc";
  url: {
    duration: string;
    file: string;
  };
}

export type Attachment = ImageAttachment | VideoAttachment | IGCFileAttachment;

export interface PostActivity extends EnrichedActivity<DefaultGenerics> {
  actor: EnrichedUser<DefaultGenerics>;
  attachments: Attachment[];
  foreign_id: string;
  id: string;
  object: string;
  time: string;
  verb: string;
  reactionCounts?: ReactionCounts;
}

export interface ReactionCounts {
  likeCount: number;
  replyCount: number;
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

export type UR = Record<string, unknown>;
export type UnknownRecord = UR;

export type APIResponse = { duration?: string };

export type FileUploadAPIResponse = APIResponse & { file: string };

export type OnUploadProgress = (progressEvent: ProgressEvent) => void;

export type ClientOptions = {
  browser?: boolean;
  expireTokens?: boolean;
  fayeUrl?: string;
  group?: string;
  keepAlive?: boolean;
  local?: boolean;
  location?: string;
  protocol?: string;
  timeout?: number;
  urlOverride?: Record<string, string>;
  version?: string;
};

type OGResource = {
  secure_url?: string;
  type?: string;
  url?: string;
};

type OGAudio = OGResource & {
  audio?: string;
};

type OGImage = OGResource & {
  alt?: string;
  height?: number;
  image?: string;
  width?: number;
};

type OGVideo = OGResource & {
  height?: number;
  video?: string;
  width?: number;
};

export type OGAPIResponse = APIResponse & {
  audios?: OGAudio[];
  description?: string;
  determiner?: string;
  favicon?: string;
  images?: OGImage[];
  locale?: string;
  site?: string;
  site_name?: string;
  title?: string;
  type?: string;
  url?: string;
  videos?: OGVideo[];
};

export type HandlerCallback = (...args: unknown[]) => unknown;

export type ForeignIDTimes = { foreign_id: string; time: Date | string } | { foreignID: string; time: Date | string };

export type ActivityPartialChanges<StreamFeedGenerics extends DefaultGenerics = DefaultGenerics> =
  Partial<ForeignIDTimes> & {
    id?: string;
    set?: Partial<StreamFeedGenerics['activityType']>;
    unset?: Array<Extract<keyof StreamFeedGenerics['activityType'], string>>;
  };

export type RealTimeMessage<StreamFeedGenerics extends DefaultGenerics = DefaultGenerics> = {
  deleted: Array<string>;
  deleted_foreign_ids: Array<[id: string, time: string]>;
  new: Array<
    Omit<
      EnrichedActivity<StreamFeedGenerics>,
      'latest_reactions' | 'latest_reactions_extra' | 'own_reactions' | 'own_reactions_extra' | 'reaction_counts'
    > & { group?: string }
  >;
  app_id?: string;
  feed?: string;
  mark_read?: 'all' | 'current' | Array<string>;
  mark_seen?: 'all' | 'current' | Array<string>;
  published_at?: string;
};
