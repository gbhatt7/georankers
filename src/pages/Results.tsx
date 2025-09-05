import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockInsightsData } from "@/data/mockInsights";
import { ArrowLeft, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsData {
  website: string;
  keywords: string[];
  isExample?: boolean;
}

export default function Results() {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [currentTab, setCurrentTab] = useState("overall");
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

  if (!resultsData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Loading Analysis...</h2>
              <p className="text-muted-foreground">
                Please wait while we prepare your results.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
                {/* Website Avatar */}
                <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold">
                  {resultsData.website.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {resultsData.website}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    These insights come directly from AI answers.
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Queries analyzed:
                  </span>
                  <span className="font-semibold">
                    {mockInsightsData.overall.total_queries}
                  </span>
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
          {/* Keywords Menu */}
          <div className="mb-6">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Navigate by Keyword
              </h3>
              <div className="flex flex-wrap gap-2">
                {resultsData.keywords.map((keyword, index) => (
                  <Button
                    key={index}
                    variant={
                      currentTab === `keyword-${index}` ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setCurrentTab(`keyword-${index}`)}
                    className="text-sm"
                  >
                    {keyword}
                  </Button>
                ))}
                <Button
                  variant={currentTab === "overall" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTab("overall")}
                  className="text-sm"
                >
                  Overall View
                </Button>
              </div>
            </div>
          </div>

          {/* Content based on selected tab */}
          {currentTab === "overall" && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {/* AI Provider Share Cards */}
                <Card className="card-gradient border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">ChatGPT</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {mockInsightsData.overall.ai_provider_share.chatgpt}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Share of mentions
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">Perplexity</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {mockInsightsData.overall.ai_provider_share.perplexity}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Share of mentions
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Overall Combined Insights */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Market Positioning
                      </span>
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      {
                        mockInsightsData.overall.combined_insights
                          .market_positioning
                      }
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Core Strengths
                      </span>
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      {
                        mockInsightsData.overall.combined_insights
                          .core_strengths
                      }
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Competitive Pressure
                      </span>
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      {
                        mockInsightsData.overall.combined_insights
                          .competitive_pressure
                      }
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
                      <span className="text-sm font-medium">
                        User Sentiment
                      </span>
                    </div>
                    <div className="text-lg font-semibold mb-2">
                      {
                        mockInsightsData.overall.combined_insights
                          .user_sentiment
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overall Recommended Actions */}
              <Card className="card-gradient border-0 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Consolidated Recommendations
                  </h3>
                  <div className="space-y-6">
                    {mockInsightsData.overall.consolidated_actions.map(
                      (actionGroup, index) => (
                        <div key={index}>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge
                              variant={
                                actionGroup.priority === "high"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {actionGroup.priority.toUpperCase()}
                            </Badge>
                            <h4 className="font-semibold">
                              {actionGroup.category}
                            </h4>
                          </div>
                          <div className="grid gap-3 md:grid-cols-1">
                            {actionGroup.actions.map((action, actionIndex) => (
                              <div
                                key={actionIndex}
                                className="flex items-start space-x-3 p-4 rounded-lg bg-accent/50"
                              >
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                                  {actionIndex + 1}
                                </div>
                                <span className="text-sm">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Sources and Queries */}
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card className="card-gradient border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Top Sources</h3>
                    <div className="space-y-3">
                      {mockInsightsData.overall.top_sources.map(
                        (source, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">
                              {source.source
                                .replace("https://", "")
                                .replace("www.", "")}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {source.frequency}
                              </Badge>
                              <div className="w-16 h-2 bg-muted rounded-full">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{
                                    width: `${(source.frequency / 16) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Top Queries</h3>
                    <div className="space-y-2">
                      {mockInsightsData.overall.top_queries.map(
                        (query, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <span className="text-sm">{query}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Keyword-specific content */}
          {currentTab.startsWith("keyword-") && (
            <div className="space-y-8">
              {(() => {
                const keywordIndex = parseInt(currentTab.split("-")[1]);
                const keywordData = mockInsightsData.keywordData[keywordIndex];

                if (!keywordData) return null;

                return (
                  <>
                    {/* AI Provider Share for this keyword */}
                    <div className="grid gap-4 md:grid-cols-4">
                      <Card className="card-gradient border-0">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                            <span className="text-sm font-medium">ChatGPT</span>
                          </div>
                          <div className="text-2xl font-bold">
                            {keywordData.analytics.ai_provider_share.chatgpt}%
                          </div>
                          <p className="text-xs text-muted-foreground">
                            For this keyword
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="card-gradient border-0">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                            <span className="text-sm font-medium">
                              Perplexity
                            </span>
                          </div>
                          <div className="text-2xl font-bold">
                            {keywordData.analytics.ai_provider_share.perplexity}
                            %
                          </div>
                          <p className="text-xs text-muted-foreground">
                            For this keyword
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-2">
                          Insights for "{keywordData.keyword}"
                        </h3>
                        <p className="text-muted-foreground">
                          Deep dive analysis for this keyword
                        </p>
                      </div>

                      {/* Insight Cards */}
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                        {keywordData.analytics.insight_cards.map(
                          (card, index) => (
                            <Card
                              key={index}
                              className="card-gradient border-0"
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center space-x-2 mb-3">
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      card.trend === "up"
                                        ? "bg-gradient-to-r from-green-500 to-green-600"
                                        : card.trend === "down"
                                        ? "bg-gradient-to-r from-red-500 to-red-600"
                                        : card.trend === "mixed"
                                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                                        : "bg-gradient-to-r from-blue-500 to-blue-600"
                                    }`}
                                  ></div>
                                  <span className="text-sm font-medium">
                                    {card.title}
                                  </span>
                                </div>
                                <div className="text-lg font-semibold mb-2">
                                  {card.value}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {card.description}
                                </p>
                              </CardContent>
                            </Card>
                          )
                        )}
                      </div>

                      {/* Recommended Actions */}
                      <Card className="card-gradient border-0 mb-8">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-4">
                            Recommended Actions
                          </h3>
                          <div className="space-y-4">
                            {keywordData.analytics.recommended_actions.map(
                              (action, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-4"
                                >
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge
                                      variant={
                                        action.priority === "high"
                                          ? "destructive"
                                          : "secondary"
                                      }
                                    >
                                      {action.priority.toUpperCase()}
                                    </Badge>
                                    <span className="font-semibold">
                                      {action.category}
                                    </span>
                                  </div>
                                  <div className="mb-3">
                                    <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/50">
                                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                                        {index + 1}
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-sm font-medium mb-1">
                                          {action.action}
                                        </div>
                                        <div className="text-xs text-muted-foreground mb-2">
                                          <strong>Impact:</strong>{" "}
                                          {action.impact}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            Effort: {action.effort}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Sources and Queries */}
                      <div className="grid gap-6 md:grid-cols-2 mb-8">
                        <Card className="card-gradient border-0">
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Top Sources</h3>
                            <div className="space-y-3">
                              {keywordData.analytics.drilldowns.sources_list.map(
                                (source, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="text-sm">
                                      {source.source
                                        .replace("https://", "")
                                        .replace("www.", "")}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline">
                                        {source.frequency}
                                      </Badge>
                                      <div className="w-16 h-2 bg-muted rounded-full">
                                        <div
                                          className="h-full bg-primary rounded-full"
                                          style={{
                                            width: `${
                                              (source.frequency / 9) * 100
                                            }%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="card-gradient border-0">
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">
                              Related Queries
                            </h3>
                            <div className="space-y-2">
                              {keywordData.analytics.drilldowns.query_explorer.map(
                                (query, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start space-x-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                                    <span className="text-sm">
                                      {query.query}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Attributes Matrix */}
                      <Card className="card-gradient border-0">
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-4">Key Attributes</h3>
                          <div className="space-y-4">
                            {keywordData.analytics.drilldowns.attributes_matrix.map(
                              (attr, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">
                                      {attr.attribute}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        variant={
                                          attr.importance === "high"
                                            ? "destructive"
                                            : "secondary"
                                        }
                                      >
                                        {attr.importance}
                                      </Badge>
                                      <Badge variant="outline">
                                        Freq: {attr.frequency}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {attr.value}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
