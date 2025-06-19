import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDreamDetail = async (keyword: string) => {
  const { data } = await axios.post('/api/dream-detail', { keyword });
  console.log("fetchDreamDetail data : ", data);
  return data;
};

export function useDreamDetail(keyword: string) {
  return useQuery({
    queryKey: ['dream-detail', keyword],
    queryFn: () => fetchDreamDetail(keyword),
    enabled: !!keyword,
  });
} 