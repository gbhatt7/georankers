import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Plus, Search, Building2, Tags, ExternalLink } from "lucide-react";

export default function InputPage() {
  const [brand, setBrand] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addKeyword = () => {
    if (
      currentKeyword.trim() &&
      keywords.length < 3 &&
      !keywords.includes(currentKeyword.trim())
    ) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand.trim()) {
      toast({
        title: "Brand required",
        description: "Please enter your brand or website name.",
        variant: "destructive",
      });
      return;
    }

    if (keywords.length === 0) {
      toast({
        title: "Keywords required",
        description: "Please add at least one keyword.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/results", {
        state: {
          brand: brand.trim(),
          keywords,
        },
      });
    }, 2000);
  };

  const showExampleOutput = () => {
    navigate("/results", {
      state: {
        brand: "Kommunicate",
        keywords: ["customer support", "live chat", "chatbot"],
        isExample: true,
      },
    });
  };

  return (
    <Layout>
      {/* Background now matches your gray theme */}
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Hero Section */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
                Check your AI search visibility
              </h1>
              <p className="text-xl text-gray-600">
                Enter your brand and up to 3 keywords to see how AI assistants mention you.
              </p>
            </div>

            {/* Form Card */}
            <Card className="text-left bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 text-center">Brand Visibility Analysis</CardTitle>
                <CardDescription className="text-gray-600 text-center">
                  Get insights into how AI assistants present your brand in search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Brand Field */}
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand or Website</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="brand"
                        type="text"
                        placeholder="e.g., Kommunicate or kommunicate.io"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        maxLength={100}
                        className="pl-11 bg-white"
                      />
                    </div>
                    <p className="text-sm text-gray-500">{brand.length}/100 characters</p>
                  </div>

                  {/* Keywords Field */}
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords (up to 3)</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2 relative">
                        <Tags className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="keywords"
                          type="text"
                          placeholder="Press Enter to add"
                          value={currentKeyword}
                          onChange={(e) => setCurrentKeyword(e.target.value)}
                          onKeyPress={handleKeyPress}
                          maxLength={60}
                          disabled={keywords.length >= 3}
                          className="pl-11 bg-white"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={addKeyword}
                          disabled={
                            !currentKeyword.trim() ||
                            keywords.length >= 3 ||
                            keywords.includes(currentKeyword.trim())
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Keywords Display */}
                      {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {keywords.map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="pl-3 pr-1 py-1 text-sm"
                            >
                              {keyword}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-red-500 hover:text-white"
                                onClick={() => removeKeyword(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      <p className="text-sm text-gray-500">
                        {keywords.length} of 3 keywords added
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    disabled={isLoading || !brand.trim() || keywords.length === 0}
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing visibility...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Run visibility check
                      </>
                    )}
                  </Button>

                  {/* Example Link */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={showExampleOutput}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      See example output
                    </Button>
                  </div>
                </form>
                <div className="mt-6 p-6 rounded-lg bg-muted/50 border">
                  <h4 className="font-semibold mb-3">Analysis Output</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• <strong>AI Share of Answers:</strong> Your brand appears in 23 of 100 queries (23%)</p>
                    <p>• <strong>Competitor Analysis:</strong> Top 5 competitors and their mention frequency</p>
                    <p>• <strong>Source Influence:</strong> Which websites shape AI responses about your industry</p>
                    <p>• <strong>Narrative Gaps:</strong> Features competitors get credited for that you don't</p>
                    <p>• <strong>Recommended Actions:</strong> Specific steps to improve AI visibility</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <p className="text-sm text-gray-500">
              Insights are based on what AI assistants say—not on scraping your site.
            </p>
          </div>
        </main>
      </div>
    </Layout>
  );
}
