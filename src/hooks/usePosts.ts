import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type FilterType = 'all' | 'ideas' | 'projects' | 'events' | 'teams';

interface Post {
  id: string;
  content: string | null;
  media_url: string | null;
  media_type: string | null;
  post_type: string;
  created_at: string;
  user_id: string;
  idea: any;
  poll: any;
  visibility: string;
  profiles: {
    username: string;
    avatar_url: string | null;
    career: string | null;
    institution_name: string | null;
  };
  reactions_count: number;
  comments_count: number;
  user_has_reacted: boolean;
}

const POSTS_PER_PAGE = 10;

export function usePosts(filter: FilterType = 'all') {
  return useInfiniteQuery({
    queryKey: ['posts', filter],
    queryFn: async ({ pageParam = 0 }) => {
      let query = supabase
        .from('posts')
        .select(
          `
          *,
          profiles:user_id (username, avatar_url, career, institution_name),
          reactions:reactions(count),
          comments:comments(count)
        `,
          { count: 'exact' }
        )
        .eq('visibility', 'public')
        .order('created_at', { ascending: false })
        .range(pageParam, pageParam + POSTS_PER_PAGE - 1);

      if (filter !== 'all') {
        const typeMap: Record<FilterType, string> = {
          ideas: 'idea',
          projects: 'project',
          events: 'academic_event',
          teams: 'team',
          all: 'all',
        };
        query = query.eq('post_type', typeMap[filter]);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        posts: data || [],
        nextPage: data && data.length === POSTS_PER_PAGE ? pageParam + POSTS_PER_PAGE : undefined,
        totalCount: count || 0,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: {
      content: string;
      media_url?: string;
      media_type?: string;
      post_type: string;
      idea?: any;
      visibility?: 'public' | 'private' | 'friends' | 'incognito';
      user_id: string;
    }) => {
      const { data, error } = await supabase.from('posts').insert([postData]).select().single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('¡Publicación creada!');
    },
    onError: (error: any) => {
      toast.error('Error al crear publicación: ' + error.message);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Publicación eliminada');
    },
    onError: (error: any) => {
      toast.error('Error al eliminar: ' + error.message);
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, updates }: { postId: string; updates: any }) => {
      const { error } = await supabase.from('posts').update(updates).eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Publicación actualizada');
    },
    onError: (error: any) => {
      toast.error('Error al actualizar: ' + error.message);
    },
  });
}
