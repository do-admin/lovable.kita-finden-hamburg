import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug, ratgeberArticles } from "@/data/ratgeber-articles";
import { Card, CardContent } from "@/components/ui/card";

const RatgeberArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <section className="flex-1 section-padding">
          <div className="container-custom">
            <div className="max-w-[680px] mx-auto text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Artikel nicht gefunden</h1>
              <p className="text-muted-foreground mb-6">
                Der gesuchte Artikel existiert leider nicht.
              </p>
              <Link 
                to="/ratgeber" 
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück zum Ratgeber
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Get related articles from the same category
  const relatedArticles = ratgeberArticles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background border-b border-border">
        <div className="container-custom pt-[60px] pb-[40px]">
          <div className="max-w-[680px] mx-auto">
            <Link 
              to="/ratgeber" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück zum Ratgeber
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {article.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {article.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="flex-1 section-padding">
        <div className="container-custom">
          <div className="max-w-[680px] mx-auto">
            <article className="prose prose-slate max-w-none">
              {article.content.map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-semibold text-foreground mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-6">Weitere Artikel zum Thema</h3>
                <div className="grid gap-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.slug} to={`/ratgeber/${related.slug}`}>
                      <Card className="border-border hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-5">
                          <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                            {related.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {related.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                to="/ratgeber" 
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Alle Ratgeber-Artikel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RatgeberArticle;
