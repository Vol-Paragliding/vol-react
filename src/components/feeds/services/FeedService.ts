import { FeedUser, PostActivity } from '../types/feedTypes';
import {
  getUserUrl,
  getUserFeedUrl,
  getFollowUrl,
  getUnfollowUrl,
  getFollowersUrl,
  getFollowingUrl,
  getTimelineFeedUrl,
  getReactionUrl,
  getImagesUrl,
  BASE_URLS
} from '../../../utils/urlFactory';

export const getUser = async (userId: string, feedToken: string) => {
  const url = getUserUrl(BASE_URLS.usEast, userId);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const updateUser = async (user: FeedUser, userId: string, feedToken: string) => {
  const url = getUserUrl(BASE_URLS.usEast, userId);

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const createUser = async (user: FeedUser, feedToken: string) => {
  const url = getUserUrl(BASE_URLS.usEast, '');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export interface FollowParamModel {
  target: string;
  activity_copy_limit: number;
}

export const follow = async (params: FollowParamModel, userId: string, feedToken: string) => {
  const url = getFollowUrl(BASE_URLS.usEast, userId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export interface UnfollowParamModel {
  keep_history: boolean;
}

export const unfollow = async (params: UnfollowParamModel, target: string, userId: string, feedToken: string) => {
  const url = getUnfollowUrl(BASE_URLS.usEast, userId, target);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export interface PagingModel {
  limit: number;
  offset: number;
}

export const getFollowers = async (userId: string, feedToken: string, pagingModel?: PagingModel) => {
  let url = getFollowersUrl(BASE_URLS.usEast, userId);

  // If a paging model is provided, append its parameters to the URL
  if (pagingModel) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = new URLSearchParams(pagingModel as any).toString();
    url += `?${params}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const getFollowing = async (userId: string, feedToken: string, pagingModel?: PagingModel) => {
  let url = getFollowingUrl(BASE_URLS.usEast, userId);

  if (pagingModel) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = new URLSearchParams(pagingModel as any).toString();
    url += `?${params}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const getUserActivities = async (userId: string, feedToken: string) => {
  const url = getUserFeedUrl(BASE_URLS.usEast, userId);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

export const getTimelineActivities = async (userId: string, feedToken: string) => {
  const url = getTimelineFeedUrl(BASE_URLS.usEast, userId);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export const addActivity = async (userId: string, feedToken: string, activity: PostActivity) => {
  const url = getUserFeedUrl(BASE_URLS.usEast, userId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken
    },
    body: JSON.stringify(activity)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

interface ReplyReactionParamModel {
  activityId: string;
  reply: string;
}

export const addReaction = async (activityId: string, reply: string, feedToken: string) => {
  const reaction: ReplyReactionParamModel = { activityId, reply };
  const url = getReactionUrl(BASE_URLS.usEast, activityId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken
    },
    body: JSON.stringify(reaction)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

interface LikeReactionParamModel {
  activityId: string;
}

export const addLike = async (activityId: string, feedToken: string) => {
  const reaction: LikeReactionParamModel = { activityId };
  const url = getReactionUrl(BASE_URLS.usEast, activityId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken
    },
    body: JSON.stringify(reaction)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};

interface FileResultModel {
  duration: string;
  file: string;
}

export const uploadImage = async (fileName: string, mimeType: string, imageData: Blob, feedToken: string) => {
  const url = getImagesUrl(BASE_URLS.usEast);

  const formData = new FormData();
  formData.append('file', new Blob([imageData], { type: mimeType }), fileName);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: FileResultModel = await response.json();
  return new URL(data.file);
};

export const deleteImage = async (cdnUrl: string, feedToken: string) => {
  const url = getImagesUrl(BASE_URLS.usEast);

  const response = await fetch(url + '?url=' + encodeURIComponent(cdnUrl), {
    method: 'DELETE',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

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

export const processImage = async (
  cdnUrl: string,
  resize: CdnImageResizeStrategy | null = null,
  crop: CdnImageCropStrategy | null = null,
  width: number | null = null,
  height: number | null = null,
  feedToken: string
): Promise<string> => {
  const url = new URL(getImagesUrl(BASE_URLS.usEast));

  const params = new URLSearchParams({
    ...(resize && { resize: resize }),
    ...(crop && { crop: crop }),
    ...(width && { w: width.toString() }),
    ...(height && { h: height.toString() }),
    url: cdnUrl,
  });

  url.search = params.toString();

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Stream-Auth-Type': 'jwt',
      'Authorization': feedToken,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const fileUrl = await response.text();
  return fileUrl;
};
