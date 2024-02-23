export interface MuxUploadResponse {
  upload_id: string;
  upload_url: string;
}

export interface MuxAssetUploadStatusResponse {
  asset_id: string;
  status: string;
}

export interface MuxPlaybackId {
  id: string;
  policy: string;
}

export interface MuxPlaybackResponse {
  ids: MuxPlaybackId[];
}

export interface UserReference {
  id: string;
  username: string;
}

export interface AuthUser {
  feedToken: string;
  chatToken: string;
  username: string;
  userId: string;
}

export interface LoginCredential {
  username: string;
  password: string;
}

export interface ChangeCredential {
  username: string;
  password: string;
  newPassword: string;
}
