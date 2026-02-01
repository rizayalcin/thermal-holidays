import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  images: {
    src: string;
    alt: string;
    category: string;
  }[];
}

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(images.map((img) => img.category)))];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="section-spacing bg-secondary">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="label-subtle mb-6 block">Visual Journey</span>
          <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            Photo Gallery
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-all ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-foreground/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square cursor-pointer overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-foreground/80 to-transparent p-4 transition-transform group-hover:translate-y-0">
                <span className="text-xs uppercase tracking-wider text-primary-foreground/80">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/95 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/20 p-3 text-primary-foreground transition-colors hover:bg-background/40"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/20 p-3 text-primary-foreground transition-colors hover:bg-background/40"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/20 p-3 text-primary-foreground transition-colors hover:bg-background/40"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-h-[85vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-primary-foreground/80">
              {selectedImage + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
