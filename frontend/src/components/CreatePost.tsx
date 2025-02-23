import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

// const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual API key
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpC4VJwscd_oaxY8VrVDQR0em8HhRRaqs";

export function CreatePost() {
  const [content, setContent] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const checkSentiment = async (text: string): Promise<boolean> => {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Analyze the sentiment of this text: "${text}". Respond with 'positive' or 'negative' only.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Full Gemini API Response:", data); // Debugging log

      // Check if the response structure matches expectations
      const sentiment =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.toLowerCase();

      if (!sentiment) {
        console.error("Unexpected API response format:", data);
        return false;
      }

      return sentiment.includes("negative");
    } catch (error) {
      console.error("Error checking sentiment:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Post cannot be empty!");
      return;
    }

    setLoading(true);
    const isNegative = await checkSentiment(content);
    setLoading(false);

    if (isNegative) {
      toast.error("Inappropriate content detected. Post not allowed.");
      return;
    }

    toast.success("Post created successfully!");
    console.log({ content });

    setContent("");
    // setImage(null);
  };

  return (
    <Card className="p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="mb-4 resize-none"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              // onChange={handleImageChange}
            />
            <ImagePlus className="h-6 w-6 text-gray-500 hover:text-blue-500 transition-colors" />
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Post"}
          </Button>
        </div>
        {/* {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="max-h-48 rounded-lg object-cover"
            />
          </div>
        )} */}
      </form>
    </Card>
  );
}
