import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Minus, ThumbsDown, Star, AlertCircle } from "lucide-react";
import type { Review } from "@/services/reviewService";

interface RecentFeedbackProps {
  reviews: Review[];
}

const sentimentIcons = {
  positive: <ThumbsUp className="h-4 w-4" />,
  neutral: <Minus className="h-4 w-4" />,
  negative: <ThumbsDown className="h-4 w-4" />
};

const analyzePainPoints = (message: string): string[] => {
  const painPointKeywords = [
    "slow", "expensive", "poor", "bad", "terrible", "waiting",
    "difficult", "problem", "issue", "disappointed", "improvement",
    "better", "could", "should", "wait", "long", "not good",
    "service", "quality", "time", "price", "staff", "attitude"
  ];

  const lowercaseMessage = message.toLowerCase();
  const foundPainPoints = painPointKeywords.filter(keyword => 
    lowercaseMessage.includes(keyword)
  );

  return foundPainPoints;
};

export const RecentFeedback = ({ reviews = [] }: RecentFeedbackProps) => {
  console.log("RecentFeedback received reviews:", reviews?.length);
  
  return (
    <Card className="p-6 animate-fade-up hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Reviews</h2>
        <Badge variant="outline">Live Updates</Badge>
      </div>
      <div className="space-y-4">
        {(!reviews || reviews.length === 0) ? (
          <p className="text-center text-muted-foreground py-4">
            No reviews yet. Connect your business to start seeing reviews here.
          </p>
        ) : (
          reviews.map((review) => {
            const painPoints = analyzePainPoints(review.message);
            return (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{review.customer}</p>
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {review.message}
                    </p>
                    {painPoints.length > 0 && (
                      <div className="mt-2 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        <p className="text-sm text-red-500">
                          Potential pain points: {painPoints.join(", ")}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {review.location}
                    </p>
                  </div>
                  <Badge
                    variant={
                      review.sentiment === "positive" ? "success" : "secondary"
                    }
                    className="flex items-center gap-1"
                  >
                    {sentimentIcons[review.sentiment]}
                    {review.sentiment}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                  <Badge variant="outline" className="text-xs">
                    {review.platform}
                  </Badge>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};