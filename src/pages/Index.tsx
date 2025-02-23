import { useState } from "react";
import { BarChart3, MessageSquare, Star, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricsCard } from "@/components/MetricsCard";
import { RecentFeedback } from "@/components/RecentFeedback";
import { SentimentChart } from "@/components/SentimentChart";
import { CompanyUrlForm } from "@/components/CompanyUrlForm";
import type { Review } from "@/services/reviewService";

const Index = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleReviewsFetched = (newReviews: Review[]) => {
    console.log("Updating reviews in Index component:", newReviews.length);
    setReviews(newReviews);
  };

  // Calculate average rating safely
  const calculateAverageRating = () => {
    if (reviews.length === 0) return "0.0";
    return (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <CompanyUrlForm onReviewsFetched={handleReviewsFetched} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
          <MetricsCard
            title="Total Reviews"
            value={reviews.length.toString()}
            trend={reviews.length > 0 ? "+1 new review" : undefined}
            icon={<MessageSquare className="h-6 w-6" />}
            trendDirection="up"
          />
          <MetricsCard
            title="Average Rating"
            value={calculateAverageRating()}
            icon={<Star className="h-6 w-6" />}
          />
          <MetricsCard
            title="Response Rate"
            value="92%"
            trend="+5% from last month"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <MetricsCard
            title="Active Forms"
            value="8"
            icon={<BarChart3 className="h-6 w-6" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentChart />
          <RecentFeedback reviews={reviews} />
        </div>
      </main>
    </div>
  );
};

export default Index;