import {
  CdnImageOptions,
  FileResultModel,
  FollowParamModel,
  PagingModel,
  PostActivity,
  UnfollowParamModel,
  UserData
} from '../interfaces/types';
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
} from '../utils/urlFactory';

const isValidRequest = (userId: string, feedToken: string) => {
  if (!userId || !feedToken) {
    console.error("Invalid request: userId or feedToken is missing.");
    return false;
  }
  return true;
};

export const getUser = async (userId: string, feedToken: string) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getUserUrl(BASE_URLS.usEast, userId);

  try {
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

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return Promise.reject(error);
  }
};

export const updateUser = async (userData: UserData, userId: string, feedToken: string) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getUserUrl(BASE_URLS.usEast, userId);
  const requestBody = { data: userData };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update user:", error);
    return Promise.reject(error);
  }
};

export const createUser = async (userData: UserData, feedToken: string) => {
  if (!feedToken) return Promise.reject("Feed token is missing.");

  const url = getUserUrl(BASE_URLS.usEast, '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create user:", error);
    return Promise.reject(error);
  }
};

export const follow = async (params: FollowParamModel, userId: string, feedToken: string) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getFollowUrl(BASE_URLS.usEast, userId);

  try {
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

    return await response.json();
  } catch (error) {
    console.error("Failed to follow user:", error);
    return Promise.reject(error);
  }
};

export const unfollow = async (params: UnfollowParamModel, target: string, userId: string, feedToken: string) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getUnfollowUrl(BASE_URLS.usEast, userId, target);

  try {
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

    return await response.json();
  } catch (error) {
    console.error("Failed to unfollow user:", error);
    return Promise.reject(error);
  }
};

export const getFollowers = async (userId: string, feedToken: string, pagingModel?: PagingModel) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  let url = getFollowersUrl(BASE_URLS.usEast, userId);
  if (pagingModel) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = new URLSearchParams(pagingModel as any).toString();
    url += `?${params}`;
  }

  try {
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

    return (await response.json()).results;
  } catch (error) {
    console.error("Failed to fetch followers:", error);
    return Promise.reject(error);
  }
};

export const getFollowing = async (userId: string, feedToken: string, pagingModel?: PagingModel) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  let url = getFollowingUrl(BASE_URLS.usEast, userId);
  if (pagingModel) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = new URLSearchParams(pagingModel as any).toString();
    url += `?${params}`;
  }

  try {
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

    return (await response.json()).results;
  } catch (error) {
    console.error("Failed to fetch following:", error);
    return Promise.reject(error);
  }
};

export const getUserActivities = async (userId: string, feedToken: string) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getUserFeedUrl(BASE_URLS.usEast, userId);

  try {
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

    return (await response.json()).results;
  } catch (error) {
    console.error("Failed to fetch user activities:", error);
    return Promise.reject(error);
  }
};

export const getTimelineActivities = async (userId: string, feedToken: string) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getTimelineFeedUrl(BASE_URLS.usEast, userId);

  try {
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

    return (await response.json()).results;
  } catch (error) {
    console.error("Failed to fetch timeline activities:", error);
    return Promise.reject(error);
  }
};

export const addActivity = async (userId: string, feedToken: string, activity: PostActivity) => {
  if (!isValidRequest(userId, feedToken)) return Promise.reject("Invalid user ID or feed token.");

  const url = getUserFeedUrl(BASE_URLS.usEast, userId);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add activity:", error);
    return Promise.reject(error);
  }
};

export const addReaction = async (activityId: string, reply: string, feedToken: string) => {
  if (!activityId || !isValidRequest("", feedToken)) {
    return Promise.reject("Invalid activity ID or feed token.");
  }

  const reaction = { activityId, reply };
  const url = getReactionUrl(BASE_URLS.usEast, activityId);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
      body: JSON.stringify(reaction),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add reaction:", error);
    return Promise.reject(error);
  }
};

export const addLike = async (activityId: string, feedToken: string) => {
  if (!activityId || !isValidRequest("", feedToken)) return Promise.reject("Invalid activity ID or feed token.");

  const url = getReactionUrl(BASE_URLS.usEast, activityId);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
      body: JSON.stringify({ activityId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add like:", error);
    return Promise.reject(error);
  }
};

export const uploadImage = async (fileName: string, mimeType: string, imageData: Blob, feedToken: string) => {
  if (!isValidRequest("", feedToken)) return Promise.reject("Invalid feed token.");

  const url = getImagesUrl(BASE_URLS.usEast);
  const formData = new FormData();
  formData.append('file', new Blob([imageData], { type: mimeType }), fileName);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FileResultModel = await response.json();
    return new URL(data.file);
  } catch (error) {
    console.error("Failed to upload image:", error);
    return Promise.reject(error);
  }
};

export const deleteImage = async (cdnUrl: string, feedToken: string) => {
  if (!isValidRequest("", feedToken) || !cdnUrl) {
    return Promise.reject("Invalid feed token or CDN URL.");
  }

  const url = getImagesUrl(BASE_URLS.usEast) + '?url=' + encodeURIComponent(cdnUrl);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Stream-Auth-Type': 'jwt',
        'Authorization': feedToken,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete image:", error);
    return Promise.reject(error);
  }
};

export const processImage = async (
  cdnUrl: string,
  options: CdnImageOptions,
  feedToken: string
) => {
  if (!isValidRequest("", feedToken) || !cdnUrl) {
    return Promise.reject("Invalid feed token or CDN URL.");
  }

  const url = new URL(getImagesUrl(BASE_URLS.usEast));
  const params = new URLSearchParams({
    ...(options.resize && { resize: options.resize }),
    ...(options.crop && { crop: options.crop }),
    ...(options.width && { w: options.width.toString() }),
    ...(options.height && { h: options.height.toString() }),
    url: cdnUrl,
  });

  url.search = params.toString();

  try {
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
  } catch (error) {
    console.error("Failed to process image:", error);
    return Promise.reject(error);
  }
};
