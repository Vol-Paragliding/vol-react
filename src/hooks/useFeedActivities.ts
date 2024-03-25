// import { useState, useEffect } from 'react';

// import { getUserActivities, getTimelineActivities } from '../services/FeedService';
// import { PostActivity } from '../interfaces/types';

// const useFeedActivities = (userId: string, feedToken: string, feedType: 'timeline' | 'user' = 'timeline') => {
//   const [activities, setActivities] = useState<PostActivity[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       setIsLoading(true);
//       try {
//         let fetchedActivities: PostActivity[] | undefined;
//         if (feedType === 'timeline') {
//           fetchedActivities = await getTimelineActivities(userId, feedToken);
//         } else if (feedType === 'user') {
//           fetchedActivities = await getUserActivities(userId, feedToken);
//         }
//         setActivities(fetchedActivities || []);
//       } catch (error) {
//         console.error('Failed to fetch activities:', error);
//       }
//       setIsLoading(false);
//     };

//     fetchActivities();
//   }, [userId, feedToken, feedType]);

//   return { activities, isLoading };
// };

// export default useFeedActivities;