"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MessageCircle, Sparkles, X, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const WellnessConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    toast({
      title: "Inquiry Sent",
      description: "Our wellness curator will respond within 24 hours.",
    });

    setFormData({ name: "", email: "", message: "" });
    setShowInquiryForm(false);
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello, I'd like to inquire about a wellness retreat.");
    window.open(`https://wa.me/3612345678?text=${message}`, "_blank");
    setIsOpen(false);
  };

  const handleTailorStay = () => {
    toast({
      title: "Personalization Request",
      description: "We'll prepare a tailored itinerary and send it to your email.",
    });
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowInquiryForm(false);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 mb-2 origin-bottom-right"
          >
            <div className={`overflow-hidden rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl ${showInquiryForm ? "w-80" : "w-64"}`}>
              <div className="border-b border-border px-5 py-4">
                {showInquiryForm ? (
                  <button
                    onClick={() => setShowInquiryForm(false)}
                    className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Back
                  </button>
                ) : (
                  <>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Wellness Concierge
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">
                      How may we assist your journey?
                    </p>
                  </>
                )}
              </div>

              <AnimatePresence mode="wait">
                {showInquiryForm ? (
                  <motion.form
                    key="inquiry-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleInquirySubmit}
                    className="p-4 space-y-4"
                  >
                    <div>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background/50 border-border/50 text-sm"
                        maxLength={100}
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background/50 border-border/50 text-sm"
                        maxLength={255}
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                      <Textarea
                        placeholder="How can we help with your wellness journey?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-background/50 border-border/50 text-sm min-h-[80px] resize-none"
                        maxLength={1000}
                      />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-premium h-10 text-sm"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-2"
                  >
                    <button
                      onClick={() => setShowInquiryForm(true)}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary group-hover:bg-background">
                        <FileText className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-foreground">Send an inquiry</span>
                        <span className="block text-xs text-muted-foreground">We'll respond within 24h</span>
                      </div>
                    </button>

                    <button
                      onClick={handleWhatsApp}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary group-hover:bg-background">
                        <MessageCircle className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-foreground">WhatsApp message</span>
                        <span className="block text-xs text-muted-foreground">Chat with our curators</span>
                      </div>
                    </button>

                    <button
                      onClick={handleTailorStay}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary group-hover:bg-background">
                        <Sparkles className="h-4 w-4 text-foreground" />
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-foreground">Tailor my stay</span>
                        <span className="block text-xs text-muted-foreground">Personalized itinerary</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        className="group flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2.5 shadow-lg backdrop-blur-md transition-all hover:bg-card hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-4 w-4 text-foreground" />
            </motion.span>
          ) : (
            <motion.span
              key="sparkle"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles className="h-4 w-4 text-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-sm font-medium text-foreground">
          {isOpen ? "Close" : "Concierge"}
        </span>
      </motion.button>
    </div>
  );
};

export default WellnessConcierge;
