import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchAllFaqs, fetchAboutData } from "@/lib/api-utils";

export const Route = createFileRoute("/api-test")({
  head: () => ({
    meta: [
      { title: "API Test — BurrowSpace" },
      { name: "description", content: "Test API endpoints for BurrowSpace" },
    ],
  }),
  component: APITestPage,
});

function APITestPage() {
  const [faqData, setFaqData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      setLoading(true);
      try {
        // Test FAQ fetch
        const faqs = await fetchAllFaqs();
        setFaqData(faqs);

        // Test About data
        const about = await fetchAboutData();
        setAboutData(about);
      } catch (error) {
        console.error("API test failed:", error);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[oklch(0.08_0.02_260)] text-white pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="mb-8 text-3xl font-bold">API Test Page</h1>

          {loading ? (
            <div className="flex items-center gap-3 py-10">
              <div className="h-6 w-6 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
              <span>Loading API tests...</span>
            </div>
          ) : (
            <div className="space-y-8">
              {/* FAQ Data Test */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-xl font-semibold">FAQ Data Test</h2>
                <div className="mb-4">
                  <p className="text-sm text-white/70 mb-2">Total FAQs: {faqData?.length || 0}</p>
                  {faqData && faqData.length > 0 ? (
                    <div className="space-y-2">
                      {faqData.slice(0, 3).map((faq: any, i: number) => (
                        <div key={i} className="rounded border border-white/10 p-3">
                          <p className="font-medium">{faq.q}</p>
                          <p className="text-sm text-white/70">{faq.category}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-red-400">❌ No FAQ data loaded</p>
                  )}
                </div>
              </div>

              {/* About Data Test */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-xl font-semibold">About Data Test</h2>
                <div>
                  <p className="text-sm text-white/70 mb-2">About sections: {aboutData?.sections?.length || 0}</p>
                  <p className="text-sm text-white/70 mb-2">Founders: {aboutData?.founders?.length || 0}</p>
                  {aboutData && aboutData.sections && aboutData.sections.length > 0 ? (
                    <div className="space-y-2">
                      {aboutData.sections.slice(0, 2).map((section: any, i: number) => (
                        <div key={i} className="rounded border border-white/10 p-3">
                          <p className="font-medium">{section.title}</p>
                          <p className="text-sm text-white/70">{section.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-red-400">❌ No About data loaded</p>
                  )}
                </div>
              </div>

              {/* Status Summary */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-xl font-semibold">API Status</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={faqData && faqData.length > 0 ? "text-green-400" : "text-red-400"}>
                      {faqData && faqData.length > 0 ? "✅" : "❌"}
                    </span>
                    <span>FAQ API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={aboutData && aboutData.sections ? "text-green-400" : "text-red-400"}>
                      {aboutData && aboutData.sections ? "✅" : "❌"}
                    </span>
                    <span>About API</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}