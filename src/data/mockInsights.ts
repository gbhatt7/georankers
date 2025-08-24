export const mockInsightsData = {
  created_at: new Date().toISOString(),
  summary: {
    total_queries: 200,
    ai_share_of_answers: {
      brand_hits: 46,
      percent: 23
    }
  },
  insights: {
    competitor_share_of_voice: [
      { name: "Zendesk", count: 89, percent: 44.5 },
      { name: "Intercom", count: 67, percent: 33.5 },
      { name: "Freshdesk", count: 45, percent: 22.5 },
      { name: "Help Scout", count: 34, percent: 17 },
      { name: "LiveChat", count: 28, percent: 14 }
    ],
    source_influence: {
      total_citations: 847,
      domains: [
        { domain: "g2.com", count: 156, percent: 18.4 },
        { domain: "capterra.com", count: 134, percent: 15.8 },
        { domain: "trustpilot.com", count: 98, percent: 11.6 },
        { domain: "softwareadvice.com", count: 87, percent: 10.3 },
        { domain: "getapp.com", count: 73, percent: 8.6 },
        { domain: "reddit.com", count: 65, percent: 7.7 },
        { domain: "techcrunch.com", count: 44, percent: 5.2 },
        { domain: "forbes.com", count: 32, percent: 3.8 }
      ]
    },
    narrative_gaps: [
      { key: "pricing", label: "Pricing anchor quoted", brandHas: false, topRivalsWith: ["Zendesk", "Intercom"] },
      { key: "affordable", label: "Affordable positioning", brandHas: true, topRivalsWith: ["Freshdesk"] },
      { key: "ai_chatbot", label: "AI chatbot", brandHas: true, topRivalsWith: ["Intercom", "LiveChat"] },
      { key: "ticketing", label: "Ticketing", brandHas: false, topRivalsWith: ["Zendesk", "Freshdesk"] },
      { key: "omnichannel", label: "Omnichannel / Multi channel", brandHas: true, topRivalsWith: ["Zendesk"] },
      { key: "crm_integrations", label: "CRM integrations", brandHas: false, topRivalsWith: ["Zendesk", "Intercom"] },
      { key: "knowledge_base", label: "Knowledge base", brandHas: true, topRivalsWith: ["Zendesk"] },
      { key: "analytics", label: "Analytics / Reporting", brandHas: false, topRivalsWith: ["Intercom", "Zendesk"] }
    ],
    brand_defense: {
      enabled: true,
      risk: "Medium",
      brand_appears_in_alt: 12,
      alt_queries_count: 28
    }
  },
  actions: [
    {
      category: "Reviews and listings",
      trigger_note: "Low presence in key review sites",
      items: [
        "Optimize G2 listing with complete feature descriptions",
        "Encourage customer reviews on Capterra and TrustPilot",
        "Update Software Advice profile with current pricing",
        "Submit product to GetApp with comprehensive screenshots"
      ]
    },
    {
      category: "Pricing and positioning",
      trigger_note: "Pricing information not well represented",
      items: [
        "Create clear pricing anchor content for AI training",
        "Develop value proposition content emphasizing cost-effectiveness",
        "Publish pricing comparison guides on your blog"
      ]
    },
    {
      category: "Content and feature coverage",
      trigger_note: "Missing coverage for key features rivals get credit for",
      items: [
        "Create comprehensive ticketing system documentation",
        "Develop CRM integration guides and case studies",
        "Publish analytics and reporting capability content",
        "Create feature comparison pages"
      ]
    },
    {
      category: "Brand defense and comparisons",
      trigger_note: "Medium risk in alternative queries",
      items: [
        "Monitor alternative queries and improve presence",
        "Create comparison pages for top competitors",
        "Develop unique value proposition content"
      ]
    }
  ],
  drilldowns: {
    query_explorer: [
      {
        query_id: "q1",
        query: "best customer support software",
        providers: ["ChatGPT", "Gemini"],
        brand_present: true,
        top_answers: [
          {
            name: "Zendesk",
            best_rank: 1,
            description: "Enterprise-grade customer service platform with comprehensive ticketing, knowledge base, and multichannel support capabilities.",
            price: "$49-199/month",
            features: ["Ticketing", "Knowledge Base", "Live Chat", "Analytics"],
            sources: ["g2.com", "zendesk.com", "capterra.com"]
          },
          {
            name: "Kommunicate",
            best_rank: 4,
            description: "AI-powered customer support platform with chatbots and human agent handoff capabilities.",
            price: "$30-50/month",
            features: ["AI Chatbot", "Live Chat", "Multi-channel"],
            sources: ["kommunicate.io", "g2.com"]
          }
        ],
        sources_count: 5
      },
      {
        query_id: "q2",
        query: "affordable live chat software",
        providers: ["ChatGPT", "Claude"],
        brand_present: true,
        top_answers: [
          {
            name: "Kommunicate",
            best_rank: 2,
            description: "Cost-effective live chat solution with AI chatbot capabilities and seamless human handoff.",
            price: "$30/month",
            features: ["Live Chat", "AI Bot", "Mobile SDK"],
            sources: ["kommunicate.io", "capterra.com", "softwareadvice.com"]
          }
        ],
        sources_count: 3
      },
      {
        query_id: "q3",
        query: "zendesk alternatives",
        providers: ["ChatGPT", "Gemini", "Perplexity"],
        brand_present: false,
        top_answers: [
          {
            name: "Intercom",
            best_rank: 1,
            description: "Modern customer messaging platform with advanced automation and AI capabilities.",
            price: "$74-1499/month",
            features: ["Messaging", "Automation", "AI Assistant"],
            sources: ["intercom.com", "g2.com", "techcrunch.com"]
          },
          {
            name: "Freshdesk",
            best_rank: 2,
            description: "Cloud-based customer support software with ticketing, automation, and reporting features.",
            price: "$15-79/month",
            features: ["Ticketing", "Automation", "Reporting"],
            sources: ["freshworks.com", "capterra.com"]
          }
        ],
        sources_count: 4
      }
    ],
    sources_detail: [
      {
        domain: "g2.com",
        count: 156,
        percent: 18.4,
        queries: [
          "best customer support software",
          "live chat platforms comparison",
          "customer service tools review"
        ]
      },
      {
        domain: "capterra.com",
        count: 134,
        percent: 15.8,
        queries: [
          "affordable live chat software",
          "small business customer support",
          "help desk software options"
        ]
      },
      {
        domain: "trustpilot.com",
        count: 98,
        percent: 11.6,
        queries: [
          "customer support software reviews",
          "reliable chat platforms",
          "user experience feedback"
        ]
      }
    ],
    attributes_matrix: {
      columns: ["Your Brand", "Zendesk", "Intercom", "Freshdesk", "Help Scout", "LiveChat"],
      rows: [
        { attribute: "Pricing anchor quoted", values: [false, true, true, true, false, true] },
        { attribute: "Affordable positioning", values: [true, false, false, true, true, false] },
        { attribute: "AI chatbot", values: [true, false, true, false, false, true] },
        { attribute: "Ticketing", values: [false, true, true, true, true, false] },
        { attribute: "Omnichannel", values: [true, true, true, false, false, true] },
        { attribute: "CRM integrations", values: [false, true, true, true, true, false] },
        { attribute: "Knowledge base", values: [true, true, false, true, false, false] },
        { attribute: "Analytics / Reporting", values: [false, true, true, true, true, true] }
      ]
    }
  }
};