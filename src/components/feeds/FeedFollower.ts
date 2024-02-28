export interface FeedFollower {
    feedId: string;
    targetId: string;
    createdAt: Date;
    updatedAt: Date;
}

// Function to parse JSON data into a FeedFollower object
export function parseFeedFollower(data: {
  feed_id: string; target_id: string; created_at: string; updated_at: string;
}): FeedFollower {
    return {
        feedId: data.feed_id,
        targetId: data.target_id,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
    };
}
