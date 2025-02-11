import { useEffect, useState } from 'react';
import { Community, getCommunityDetails, joinCommunity, leaveCommunity } from '../dpop';

export const useCommunity = (slug: string): { community: Community | null, loading: boolean, error: Error | null, isMember: boolean, toggleJoin: () => Promise<void> } => {
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const data = await getCommunityDetails(slug);
        setCommunity(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCommunity();
    }
  }, [slug]);

  const toggleJoin = async () => {
    if (community?.is_member) {
      await leaveCommunity(community.slug);
    } else {
      await joinCommunity(community.slug);
    }
  };

  return { community, loading, error, isMember: community?.is_member ?? false, toggleJoin };
};
