import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { InsightCards } from "@/components/results/InsightCards";
import { RecommendedActions } from "@/components/results/RecommendedActions";
import { Drilldowns } from "@/components/results/Drilldowns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockInsightsData } from "@/data/mockInsights";
import { ArrowLeft, Calendar, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoredData {
  brand: string;
  keywords: string[];
  timestamp: number;
}

export default function Results() {
  const [brandData, setBrandData] = useState<StoredData | null>(null);
  const [currentTab, setCurrentTab] = useState("queries");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('aiSearchData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setBrandData(data);
      } catch (error) {
        console.error("Failed to parse stored data:", error);
        navigate("/input");
      }
    } else {
      navigate("/input");
    }
  }, [navigate]);

  const handleViewQueries = () => setCurrentTab("queries");
  const handleViewSources = () => setCurrentTab("sources");
  const handleViewAttributes = () => setCurrentTab("attributes");

  if (!brandData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Loading Analysis...</h2>
              <p className="text-muted-foreground">Please wait while we prepare your results.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Brand Info */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {/* Brand Avatar */}
                  <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold">
                    {brandData.brand.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg">{brandData.brand}</h1>
                    <p className="text-sm text-muted-foreground">
                      These insights come directly from AI answers.
                    </p>
                  </div>
                </div>
                
                {/* Keywords */}
                <div className="hidden md:flex items-center space-x-2">
                  {brandData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Queries analyzed:</span>
                  <span className="font-semibold">{mockInsightsData.summary.total_queries}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Generated:</span>
                  <span className="font-semibold">{formatDate(brandData.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/input")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Keywords Display for Mobile */}
          <div className="md:hidden mb-6">
            <Card className="bg-muted/20 border-0">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Keywords analyzed:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {brandData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insight Cards */}
          <InsightCards
            data={mockInsightsData}
            onViewQueries={handleViewQueries}
            onViewSources={handleViewSources}
            onViewAttributes={handleViewAttributes}
          />

          {/* Recommended Actions */}
          <RecommendedActions actions={mockInsightsData.actions} />

          {/* Drilldowns */}
          <Drilldowns data={mockInsightsData.drilldowns} />

          {/* Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Brand mentioned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span>Not mentioned</span>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                This analysis is based on AI model responses and may not reflect all available data. 
                Results are updated regularly as AI models evolve. For questions about specific insights, 
                please review the detailed drilldowns above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}