"use client";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GeneratedPost, GeneratedPostsResponse } from "@/types/GeneratePost";
import { FileText } from "lucide-react";
import PostCard from "./PostCard";
import { getBackendUrl } from "@/lib/env";

type BackendErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

type QueryParams = {
  page: number;
  limit: number;
  search?: string;
  orderBy: string;
};

const GeneratedPosts = () => {
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // query state
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9);

  const [orderBy] = useState<string>("createdAt");

  // meta
  const [total, setTotal] = useState<number>(0);
  const [noofpages, setNoofpages] = useState<number>(1);

  // Debounce search input
  useEffect(() => {
    const t = window.setTimeout(() => {
      const normalized = searchInput.trim();
      setSearch(normalized);
      setPage(1);
    }, 400);

    return () => window.clearTimeout(t);
  }, [searchInput]);

  const canGoPrev = page > 1;
  const canGoNext = page < noofpages;

  const queryParams: QueryParams = useMemo(() => {
    const params: QueryParams = {
      page,
      limit,
      orderBy,
    };

    if (search.length > 0) {
      params.search = search;
    }

    return params;
  }, [page, limit, orderBy, search]);

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const url = `${getBackendUrl()}/users/generated-posts`;

      const res = await axios.get<GeneratedPostsResponse>(url, {
        params: queryParams,
        withCredentials: true,
      });

      setPosts(res.data.data);
      setTotal(res.data.meta.total);
      setNoofpages(res.data.meta.noofpages);
    } catch (err: unknown) {
      let message = "Failed to fetch generated posts";

      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<BackendErrorResponse>;
        message =
          axiosErr.response?.data?.message ??
          axiosErr.message ??
          "Failed to fetch generated posts";
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      setPosts([]);
      setTotal(0);
      setNoofpages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-1">
            Generated Posts
          </h1>
          <p className="text-muted-foreground">
            View and manage all your previously generated content.
          </p>
        </div>
      </div>

      {/* Search + Pagination Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="w-full md:w-[420px]">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search posts..."
            className="w-full h-10 px-4 rounded-md border bg-background"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            className=" cursor-pointer"
            variant="outline"
            disabled={!canGoPrev || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>

          <div className="text-sm text-muted-foreground">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{noofpages}</span>{" "}
            <span className="ml-2">({total} total)</span>
          </div>

          <Button
            className=" cursor-pointer"
            variant="outline"
            disabled={!canGoNext || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Loading/Error */}
      {error && (
        <GlassCard className="p-4 mb-6">
          <p className="text-sm text-destructive">{error}</p>
        </GlassCard>
      )}

      {/* Posts Grid */}
      {loading ? (
        <GlassCard className="p-12 text-center">
          <p className="text-muted-foreground">Loading posts...</p>
        </GlassCard>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={post.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <GlassCard className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading text-xl font-semibold mb-2">
            No Posts Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start generating content to see your posts here.
          </p>
          <Button className=" cursor-pointer" variant="gradient" asChild>
            <a href="/generate">Generate Your First Post</a>
          </Button>
        </GlassCard>
      )}
    </div>
  );
};

export default GeneratedPosts;
