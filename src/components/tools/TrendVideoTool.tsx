import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Link as LinkIcon, 
  Filter,
  Loader2,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { 
  TrendVideo, 
  TREND_CATEGORIES, 
  subscribeTrendVideos 
} from '../../lib/trendVideos';

export default function TrendVideoTool() {
  const [videos, setVideos] = useState<TrendVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeTrendVideos((data) => {
      setVideos(data);
      setLoading(false);
    }, true); // true = hanya yang aktif

    return () => unsubscribe();
  }, []);

  const filteredVideos = selectedCategory === 'Semua'
    ? videos
    : videos.filter((v) => v.category === selectedCategory);

  const handleCopy = async (video: TrendVideo) => {
    try {
      await navigator.clipboard.writeText(video.tiktokUrl);
      setCopiedId(video.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Gagal copy:', err);
      alert('Gagal menyalin link');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={20} className="text-violet-600" />
          <h2 className="text-lg font-semibold text-slate-800">Trend Video Viral</h2>
        </div>
        <p className="text-sm text-slate-500">
          Kumpulan video TikTok viral. Salin link lalu tempel ke tool lain (Replika Video, Ekstrak Prompt, dll).
        </p>
      </div>

      {/* Filter */}
      <div className="mb-5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Filter size={15} />
          <span className="font-medium">Kategori:</span>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          <option value="Semua">Semua</option>
          {TREND_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <span className="text-xs text-slate-400">
          {filteredVideos.length} video
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <Loader2 className="mx-auto animate-spin mb-2" size={28} />
            <p className="text-sm">Memuat video trend...</p>
          </div>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <TrendingUp size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">Belum ada video trend.</p>
            <p className="text-xs mt-1">Admin belum menambahkan video.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-[9/12] bg-slate-100 relative overflow-hidden">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <TrendingUp size={40} />
                  </div>
                )}

                {/* Badge kategori */}
                <div className="absolute top-2 left-2">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-white backdrop-blur-sm">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-slate-800 line-clamp-2 mb-2 leading-snug">
                  {video.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  {video.viewCount && (
                    <span>{video.viewCount} views</span>
                  )}
                  {video.likeCount && (
                    <span>{video.likeCount} likes</span>
                  )}
                </div>

                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleCopy(video)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      copiedId === video.id
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-100'
                    }`}
                  >
                    {copiedId === video.id ? (
                      <>
                        <Check size={13} />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Salin Link
                      </>
                    )}
                  </button>

                  <a
                    href={video.tiktokUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-violet-600 hover:bg-slate-50 border border-slate-200 transition-colors"
                    title="Buka di TikTok"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
