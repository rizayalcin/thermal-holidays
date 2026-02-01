"use client";

import Header from "@/components/hotel/Header";
import Footer from "@/components/hotel/Footer";
import ShopHero from "@/components/shop/ShopHero";
import ShopPhilosophy from "@/components/shop/ShopPhilosophy";
import ShopCategories from "@/components/shop/ShopCategories";
import ShopFeatured from "@/components/shop/ShopFeatured";
import ShopRetreatConnection from "@/components/shop/ShopRetreatConnection";
import ShopEditorialBreak from "@/components/shop/ShopEditorialBreak";
import ShopGifting from "@/components/shop/ShopGifting";
import ShopDecisionCta from "@/components/shop/ShopDecisionCta";
import ShopSeasonalPreview from "@/components/shop/ShopSeasonalPreview";
import ShopSubscriptionPreview from "@/components/shop/ShopSubscriptionPreview";
import ShopRetreatEditions from "@/components/shop/ShopRetreatEditions";

const ShopPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* 1. Hero — Emotional Entry */}
                <ShopHero />

                {/* 2. Philosophy / Essence */}
                <ShopPhilosophy />

                {/* 3. Curated Categories */}
                <ShopCategories />

                {/* 4. Featured Ritual Selections */}
                <ShopFeatured />

                {/* 5. Seasonal Ritual Preview */}
                <ShopSeasonalPreview />

                {/* 6. "Used in Our Retreats" Section */}
                <ShopRetreatConnection />

                {/* 7. Retreat Editions */}
                <ShopRetreatEditions />

                {/* 8. Editorial Lifestyle Break */}
                <ShopEditorialBreak />

                {/* 9. Gifting & Meaningful Objects */}
                <ShopGifting />

                {/* 10. Monthly Ritual Subscription Preview */}
                <ShopSubscriptionPreview />

                {/* 11. Soft Decision CTA */}
                <ShopDecisionCta />
            </main>

            <Footer />
        </div>
    );
};

export default ShopPage;
