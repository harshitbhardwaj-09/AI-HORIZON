import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  MessageCircle,
  Share,
  Send,
  ThumbsUp,
  ThumbsDown,
  Reply,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  image?: string;
  timestamp: string;
}

interface Comment {
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
  sentiment?: "positive" | "negative";
  replies?: Comment[];
}

export function Post({
  username,
  avatar,
  content,
  image,
  timestamp,
}: PostProps) {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      username: "AliceJohnson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "This is amazing! Thanks for sharing.",
      timestamp: "1 hour ago",
      sentiment: "positive",
      replies: [],
    },
    {
      username: "BobWilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "Great work! Looking forward to seeing more.",
      timestamp: "30 minutes ago",
      sentiment: "positive",
      replies: [],
    },
  ]);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // const analyzeSentiment = (text: string): "positive" | "negative" => {
  //   // Simple sentiment analysis based on positive and negative words
  //   const positiveWords = [
  //     "great",
  //     "good",
  //     "awesome",
  //     "excellent",
  //     "amazing",
  //     "love",
  //     "thanks",
  //     "wonderful",
  //   ];
  //   const negativeWords = [
  //     "bad",
  //     "poor",
  //     "terrible",
  //     "awful",
  //     "horrible",
  //     "hate",
  //     "dislike",
  //     "disappointed",
  //   ];

  //   const words = text.toLowerCase().split(" ");
  //   let positiveCount = words.filter((word) =>
  //     positiveWords.includes(word)
  //   ).length;
  //   let negativeCount = words.filter((word) =>
  //     negativeWords.includes(word)
  //   ).length;

  //   return positiveCount >= negativeCount ? "positive" : "negative";
  // };

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      // Gemini API request for Moderation and Sentiment Analysis
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpC4VJwscd_oaxY8VrVDQR0em8HhRRaqs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze the following comment for moderation and sentiment:
                    - Comment: "${comment}"
                    - If it contains hate speech, threats, or inappropriate content, respond with "flagged".
                    - Otherwise, analyze its sentiment and respond with only "positive" or "negative".`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const geminiData = await geminiResponse.json();
      const responseText =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
          .trim()
          .toLowerCase();

      if (responseText === "flagged") {
        toast({
          title: "Warning",
          description:
            "Your comment may contain inappropriate content. Please revise it.",
          variant: "destructive",
        });
        return;
      }

      if (responseText !== "positive" && responseText !== "negative") {
        toast({
          title: "Error",
          description: "Sentiment analysis failed. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Add the comment to the UI
      setComments([
        ...comments,
        {
          username: "CurrentUser",
          avatar: "https://github.com/shadcn.png",
          content: comment,
          timestamp: "Just now",
          sentiment: responseText,
          replies: [],
        },
      ]);

      toast({
        title: "Success",
        description: "Comment posted successfully!",
      });

      setComment("");
    } catch (error) {
      console.error("Error handling comment:", error);
      toast({
        title: "Error",
        description: "Something went wrong while processing your comment.",
        variant: "destructive",
      });
    }
  };

  const handleReply = async (commentIndex: number) => {
    if (!replyContent.trim()) return;

    try {
      // Gemini API request for Moderation and Sentiment Analysis
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpC4VJwscd_oaxY8VrVDQR0em8HhRRaqs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze the following reply for moderation and sentiment:
                    - Reply: "${replyContent}"
                    - If it contains hate speech, threats, or inappropriate content, respond with "flagged".
                    - Otherwise, analyze its sentiment and respond with only "positive" or "negative".`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const geminiData = await geminiResponse.json();
      const responseText =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
          .trim()
          .toLowerCase();

      if (responseText === "flagged") {
        toast({
          title: "Warning",
          description:
            "Your reply may contain inappropriate content. Please revise it.",
          variant: "destructive",
        });
        return;
      }

      if (responseText !== "positive" && responseText !== "negative") {
        toast({
          title: "Error",
          description: "Sentiment analysis failed. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Add the reply to the comment
      const newComments = [...comments];
      if (!newComments[commentIndex].replies) {
        newComments[commentIndex].replies = [];
      }

      newComments[commentIndex].replies.push({
        username: "CurrentUser",
        avatar: "https://github.com/shadcn.png",
        content: replyContent,
        timestamp: "Just now",
        sentiment: responseText,
      });

      setComments(newComments);
      setReplyContent("");
      setReplyTo(null);

      toast({
        title: "Success",
        description: "Reply posted successfully!",
      });
    } catch (error) {
      console.error("Error handling reply:", error);
      toast({
        title: "Error",
        description: "Something went wrong while processing your reply.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="p-4 mb-4 animate-fadeIn cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{username}</h3>
                  <p className="text-sm text-gray-500">{timestamp}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{content}</p>
              {image && (
                <img
                  src={image}
                  alt="Post content"
                  className="mt-3 rounded-lg w-full object-cover max-h-96"
                />
              )}
              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  className={`flex items-center space-x-2 transition-colors ${
                    isLiked
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] w-full sm:h-screen">
        <SheetHeader>
          <SheetTitle>Post Details</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 h-full overflow-hidden">
          {/* Left side - Post content */}
          <div className="overflow-y-auto pr-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{username}</h3>
                <p className="text-sm text-gray-500">{timestamp}</p>
                <p className="mt-2 text-gray-700">{content}</p>
                {image && (
                  <img
                    src={image}
                    alt="Post content"
                    className="mt-3 rounded-lg w-full object-cover max-h-96"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right side - Comments */}
          <div className="flex flex-col h-full bg-[#F1F0FB] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Comments ({comments.length})
            </h2>
            <div className="flex-1 overflow-y-auto pr-4">
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start space-x-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Avatar>
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{comment.username}</h4>
                          <span className="text-sm text-gray-500">
                            {comment.timestamp}
                          </span>
                          {comment.sentiment && (
                            <span
                              className={`flex items-center text-sm ${
                                comment.sentiment === "positive"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {comment.sentiment === "positive" ? (
                                <ThumbsUp className="h-4 w-4 mr-1" />
                              ) : (
                                <ThumbsDown className="h-4 w-4 mr-1" />
                              )}
                              {comment.sentiment}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                        <button
                          onClick={() =>
                            setReplyTo(replyTo === index ? null : index)
                          }
                          className="mt-2 text-sm text-blue-500 flex items-center hover:text-blue-600"
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Reply
                        </button>
                      </div>
                    </div>

                    {/* Reply input */}
                    {replyTo === index && (
                      <div className="ml-12 mt-2">
                        <div className="relative">
                          <Textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="min-h-[60px] pr-[100px] bg-white"
                          />
                          <Button
                            onClick={() => handleReply(index)}
                            className="absolute bottom-2 right-2 px-4 py-2"
                            size="sm"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-12 space-y-3">
                        {comment.replies.map((reply, replyIndex) => (
                          <div
                            key={replyIndex}
                            className="flex items-start space-x-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Avatar>
                              <AvatarImage src={reply.avatar} />
                              <AvatarFallback>
                                {reply.username[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold">
                                  {reply.username}
                                </h4>
                                <span className="text-sm text-gray-500">
                                  {reply.timestamp}
                                </span>
                                {reply.sentiment && (
                                  <span
                                    className={`flex items-center text-sm ${
                                      reply.sentiment === "positive"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {reply.sentiment === "positive" ? (
                                      <ThumbsUp className="h-4 w-4 mr-1" />
                                    ) : (
                                      <ThumbsDown className="h-4 w-4 mr-1" />
                                    )}
                                    {reply.sentiment}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700 mt-1">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Comment input */}
            <div className="mt-4">
              <div className="relative">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-[80px] pr-[100px] bg-white"
                />
                <Button
                  onClick={handleComment}
                  className="absolute bottom-2 right-2 px-4 py-2"
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
