import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
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

interface ResultsData {
  brand: string;
  keywords: string[];
  cardCount: "4" | "5";
  isExample?: boolean;
}

export default function Results() {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [currentTab, setCurrentTab] = useState("queries");
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Get data from navigation state
    if (location.state) {
      const data = location.state as ResultsData;
      setResultsData(data);
    } else {
      navigate("/input");
    }
  }, [user, navigate, location.state]);

  const handleViewQueries = () => setCurrentTab("queries");
  const handleViewSources = () => setCurrentTab("sources");
  const handleViewAttributes = () => setCurrentTab("attributes");

  if (!resultsData) {
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

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
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
            <div className="flex flex-col space-y-4">
              {/* Brand Info */}
              <div className="flex items-center space-x-3">
                {/* Brand Avatar */}
                <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold">
                  {resultsData.brand.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-semibold text-lg">{resultsData.brand}</h1>
                  <p className="text-sm text-muted-foreground">
                    These insights come directly from AI answers.
                  </p>
                </div>
              </div>
              
              {/* Keywords and Stats Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Keywords */}
                <div className="flex flex-wrap items-center gap-2">
                  {resultsData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Queries analyzed:</span>
                    <span className="font-semibold">{mockInsightsData.summary.total_queries}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Generated:</span>
                    <span className="font-semibold">{formatDate()}</span>
                  </div>
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


          {/* Insight Cards */}
          <InsightCards
            data={mockInsightsData}
            cardCount={resultsData.cardCount}
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