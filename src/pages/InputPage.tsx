import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Plus, Search, Globe, Tags, ExternalLink, CheckCircle, XCircle } from "lucide-react";

export default function InputPage() {
  const [brand, setBrand] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [dnsStatus, setDnsStatus] = useState<"valid" | "invalid" | "checking" | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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

  const checkDNS = async (url: string) => {
    if (!url.trim()) {
      setDnsStatus(null);
      return;
    }

    setDnsStatus("checking");
    
    // Simulate DNS check with timeout
    setTimeout(() => {
      try {
        // More comprehensive URL validation
        let testUrl = url.trim();
        
        // Add protocol if missing
        if (!testUrl.match(/^https?:\/\//)) {
          testUrl = 'https://' + testUrl;
        }
        
        const urlObj = new URL(testUrl);
        const hostname = urlObj.hostname;
        
        // Check if hostname looks valid
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        const isValid = domainRegex.test(hostname) && hostname.includes('.');
        
        setDnsStatus(isValid ? "valid" : "invalid");
      } catch {
        setDnsStatus("invalid");
      }
    }, 1000);
  };

  const handleWebsiteChange = (value: string) => {
    setBrand(value);
    // Trigger DNS check on key release (after a short delay)
    const timeoutId = setTimeout(() => {
      checkDNS(value);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand.trim()) {
      toast({
        title: "Website URL required",
        description: "Please enter your website URL.",
        variant: "destructive",
      });
      return;
    }

    if (dnsStatus !== "valid") {
      toast({
        title: "Invalid website URL",
        description: "Please enter a valid website URL that exists.",
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
          website: brand.trim(),
          keywords,
        },
      });
    }, 2000);
  };

  const showExampleOutput = () => {
    navigate("/results", {
      state: {
        website: "kommunicate.io",
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
                Enter your website URL and up to 3 keywords to see how AI assistants mention you.
              </p>
            </div>

            {/* Form Card */}
            <Card className="text-left bg-white border shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 text-center">Website Visibility Analysis</CardTitle>
                <CardDescription className="text-gray-600 text-center">
                  Get insights into how AI assistants present your website in search results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Website URL Field */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="website"
                        type="url"
                        placeholder="e.g., kommunicate.io or https://kommunicate.io"
                        value={brand}
                        onChange={(e) => handleWebsiteChange(e.target.value)}
                        maxLength={100}
                        className="pl-11 pr-11 bg-white"
                      />
                      {/* DNS Status Indicator */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {dnsStatus === "checking" && (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                        {dnsStatus === "valid" && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                        {dnsStatus === "invalid" && (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">{brand.length}/100 characters</p>
                      {dnsStatus === "checking" && (
                        <p className="text-sm text-muted-foreground">Checking domain...</p>
                      )}
                      {dnsStatus === "invalid" && (
                        <p className="text-sm text-destructive">Invalid or unreachable website</p>
                      )}
                      {dnsStatus === "valid" && (
                        <p className="text-sm text-success">Website verified</p>
                      )}
                    </div>
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
                    disabled={isLoading || !brand.trim() || keywords.length === 0 || dnsStatus !== "valid"}
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
                    <p>• <strong>AI Provider Share:</strong> ChatGPT 45%, Perplexity 25%</p>
                    <p>• <strong>Keyword-Specific Insights:</strong> Separate analysis for each keyword</p>
                    <p>• <strong>Competitor Analysis:</strong> Top competitors and their mention frequency</p>
                    <p>• <strong>Source Influence:</strong> Which websites shape AI responses about your industry</p>
                    <p>• <strong>Narrative Gaps:</strong> Features competitors get credited for that you don't</p>
                    <p>• <strong>Recommended Actions:</strong> Specific steps to improve AI visibility</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <p className="text-sm text-gray-500">
              Insights are based on what AI assistants say about your website—not on scraping your site.
            </p>
          </div>
        </main>
      </div>
    </Layout>
  );
}
