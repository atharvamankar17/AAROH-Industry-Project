export interface RecommendRequest {
  timestamp: string;
  mood: string;
  genre: string;
  language: string;
}

export interface RecommendResponse {
  prahar: string;
  rasa: string | null;
  raaga: string;
  ai: {
    playback_mode: "SONG" | "PLAYLIST";
    recommendations: {
      title: string;
      artist: string;
      search_query?: string;
    }[];
    reasoning?: string;
  };
}

export async function fetchRecommendation(
  payload: RecommendRequest
): Promise<RecommendResponse> {
  const response = await fetch("http://127.0.0.1:8000/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendation");
  }

  return response.json();
}

// export async function fetchAnalytics() {
//   const res = await fetch("http://127.0.0.1:8000/api/analytics");
//   if (!res.ok) throw new Error("Failed to fetch analytics");
//   return res.json();
// }
