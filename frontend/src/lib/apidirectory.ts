const BACKEND_URL = "http://127.0.0.1:8000";

export interface Recommendation {
  filename: string;
  reason: string;
  file_url: string;
}

export async function uploadZip(file: File) {
  const formData = new FormData();

  formData.append("zip_file", file);

  const response = await fetch(`${BACKEND_URL}/api/upload-zip`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    throw new Error(errorData.detail?.[0]?.msg || errorData.detail || "Zip upload failed");
  }

  return response.json();
}

export async function fetchRecommendation(
  mood: string,
  count: number = 8,
  temperature: number = 0.4
) {
  const formData = new FormData();
  formData.append("mood", mood);
  formData.append("count", String(count));
  formData.append("temperature", String(temperature));

  const response = await fetch(`${BACKEND_URL}/api/recommend`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to fetch recommendation");
  }

  return response.json();
}
