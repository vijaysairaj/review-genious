import { toast } from "@/components/ui/use-toast";

export interface Review {
  id: string;
  customer: string;
  message: string;
  rating: number;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
  platform: string;
  location: string;
}

export const fetchReviews = async (url: string): Promise<Review[]> => {
  console.log("Fetching reviews for URL:", url);
  
  try {
    // Simulate API call to fetch reviews
    // In a real implementation, this would make a backend request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data for demonstration
    const reviews: Review[] = [
      {
        id: Date.now().toString(),
        customer: "Recent Customer",
        message: "Just visited - excellent service and great atmosphere!",
        rating: 5,
        date: "Just now",
        sentiment: "positive",
        platform: "Google Reviews",
        location: "Main Branch"
      },
      ...mockHistoricalReviews
    ];
    
    console.log("Successfully fetched reviews:", reviews.length);
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    toast({
      title: "Error",
      description: "Failed to fetch reviews. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

const mockHistoricalReviews: Review[] = [
  {
    id: "1",
    customer: "John Smith",
    message: "Outstanding experience! The staff was very professional.",
    rating: 5,
    date: "2 hours ago",
    sentiment: "positive",
    platform: "Google Reviews",
    location: "Main Branch"
  },
  {
    id: "2",
    customer: "Emma Wilson",
    message: "Good service but room for improvement in response time.",
    rating: 4,
    date: "1 day ago",
    sentiment: "neutral",
    platform: "Google Reviews",
    location: "Main Branch"
  },
  {
    id: "3",
    customer: "Michael Brown",
    message: "Excellent attention to detail and customer service.",
    rating: 5,
    date: "2 days ago",
    sentiment: "positive",
    platform: "Google Reviews",
    location: "Main Branch"
  }
];