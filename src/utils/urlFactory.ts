export const BASE_URLS = {
  usEast: "https://us-east-api.stream-io-api.com/api/v1.0/",
  euWest: "https://eu-west-api.stream-io-api.com/api/v1.0/",
  singapore: "https://singapore-api.stream-io-api.com/api/v1.0/",
};

const appendApiKey = (url: string): string => `${url}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}`;

export const getImagesUrl = (baseUrl: string): string => appendApiKey(`${baseUrl}images`);

export const getFollowersUrl = (baseUrl: string, userId: string): string =>
  appendApiKey(`${baseUrl}feed/user/${userId}/followers`);

export const getFollowingUrl = (baseUrl: string, userId: string): string =>
  appendApiKey(`${baseUrl}feed/user/${userId}/follows`);

export const getUserUrl = (baseUrl: string, userId: string): string => appendApiKey(`${baseUrl}user/${userId}`);

export const getUserFeedUrl = (baseUrl: string, userId: string): string =>
  appendApiKey(`${baseUrl}enrich/feed/user/${userId}?withRecentReactions=true&withReactionCounts=true&withOwnReactions=true`);

export const getTimelineFeedUrl = (baseUrl: string, userId: string): string =>
  appendApiKey(`${baseUrl}enrich/feed/timeline/${userId}?withRecentReactions=true&withReactionCounts=true&withOwnReactions=true`);

export const getFollowUrl = (baseUrl: string, userId: string): string =>
  appendApiKey(`${baseUrl}feed/timeline/${userId}/follows`);

export const getUnfollowUrl = (baseUrl: string, userId: string, target: string): string =>
  appendApiKey(`${baseUrl}feed/timeline/${userId}/follows/user:${target}`);

export const getReactionUrl = (baseUrl: string, activityId: string): string =>
  appendApiKey(`${baseUrl}reaction/${activityId}`);
