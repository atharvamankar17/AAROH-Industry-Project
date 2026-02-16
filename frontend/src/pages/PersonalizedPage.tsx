import { useState } from "react";
import { uploadZip, fetchRecommendation, Recommendation } from "@/lib/apidirectory";

const moods = ["calm", "happy", "energetic", "sad", "angry", "anxious"];

export default function PersonalizedPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mood, setMood] = useState("calm");
  const [songCount, setSongCount] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [isUploaded, setIsUploaded] = useState(false);

  const handleGenerate = async () => {
    if (!selectedFile && !isUploaded) {
      alert("Please upload a ZIP file first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (selectedFile && !isUploaded) {
        await uploadZip(selectedFile);
        setIsUploaded(true); 
      }

      const result = await fetchRecommendation(mood, songCount, 0.4);

      setPlaylist(result.recommendations);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setIsUploaded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsUploaded(false);
    }
  };

  return (
    <div className="p-10 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Personalized Music</h1>

      <div className="space-y-6 max-w-xl">
        
        {/* ZIP Upload */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Upload Music Library (ZIP)</label>
            <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-600 file:text-white
                hover:file:bg-cyan-700"
            />
            {isUploaded && <span className="text-green-400 text-xs">✓ Library uploaded</span>}
        </div>

        <div className="flex gap-4">
            {/* Mood Selection */}
            <div className="flex-1">
                <label className="block text-sm mb-1">Mood</label>
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full text-black px-3 py-2 rounded"
                >
                    {moods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            {/* Song count limiter */}
            <div className="w-24">
                <label className="block text-sm mb-1">Count</label>
                <input
                    type="number"
                    min={1}
                    max={30}
                    value={songCount}
                    onChange={(e) => setSongCount(Number(e.target.value))}
                    className="w-full text-black px-3 py-2 rounded"
                />
            </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || (!selectedFile && !isUploaded)}
          className={`w-full px-6 py-3 rounded font-bold transition-all
            ${loading || (!selectedFile && !isUploaded) 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-cyan-500 hover:bg-cyan-400 text-black"}`}
        >
          {loading ? "Analyzing..." : "Generate Playlist"}
        </button>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}

        {/* Playlist */}
        {playlist.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold border-b border-gray-700 pb-2">
                Generated Playlist
            </h2>

            {playlist.map((song, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-lg hover:bg-gray-750 transition"
              >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-cyan-400">{song.filename}</p>
                        <p className="text-sm text-gray-400 mt-1 italic">"{song.reason}"</p>
                    </div>
                </div>

                <audio controls className="mt-3 w-full h-8">
                  <source
                    src={`http://127.0.0.1:8000${song.file_url}`}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
