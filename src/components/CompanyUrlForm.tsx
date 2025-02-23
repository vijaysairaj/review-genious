import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { fetchReviews } from "@/services/reviewService";

interface CompanyUrlFormProps {
  onReviewsFetched: (reviews: any[]) => void;
}

export const CompanyUrlForm = ({ onReviewsFetched }: CompanyUrlFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidGoogleReviewUrl = (url: string) => {
    console.log("Validating URL:", url);
    
    if (!url) {
      console.log("URL is empty");
      return false;
    }

    try {
      const parsedUrl = new URL(url);
      console.log("Parsed URL:", {
        hostname: parsedUrl.hostname,
        pathname: parsedUrl.pathname
      });

      const isGoogleDomain = parsedUrl.hostname.includes("google.com") || 
                            parsedUrl.hostname.includes("google.co");
      
      const isBusinessUrl = parsedUrl.pathname.includes("/business") || 
                           parsedUrl.pathname.includes("/place") ||
                           parsedUrl.pathname.includes("/maps/place");

      console.log("URL validation:", {
        isGoogleDomain,
        isBusinessUrl
      });

      return isGoogleDomain && isBusinessUrl;
    } catch (error) {
      console.error("URL parsing error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with URL:", url);
    
    if (!url) {
      console.log("URL is empty, showing error toast");
      toast({
        title: "URL Required",
        description: "Please enter your Google Review URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidGoogleReviewUrl(url)) {
      console.log("Invalid URL format, showing error toast");
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Google Business Profile or Maps URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("URL validation successful, processing submission:", url);
      
      // Fetch reviews for the business
      const reviews = await fetchReviews(url);
      console.log("Reviews fetched:", reviews.length);
      
      onReviewsFetched(reviews);
      
      toast({
        title: "Success",
        description: "Reviews have been successfully fetched",
      });
      
      setUrl("");
    } catch (error) {
      console.error("Error processing URL:", error);
      toast({
        title: "Error",
        description: "Failed to process the URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg shadow-sm">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Connect Your Business</h2>
        <p className="text-sm text-muted-foreground">
          Enter your Google Business Profile URL to start collecting feedback
        </p>
      </div>
      <div className="space-y-2">
        <Input
          type="url"
          placeholder="https://www.google.com/maps/place/your-business"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
          required
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          You can find this URL by searching for your business on Google Maps and copying the URL from your browser
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Connecting..." : "Connect Business"}
      </Button>
    </form>
  );
};