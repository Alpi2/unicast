import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage.js";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface Author {
  name: string;
  avatar: string;
}

interface FeaturedArticle {
  id: string | number;
  title: string;
  image: string;
  category: string;
  excerpt: string;
  publishDate: string;
  readTime: number | string;
  author: Author;
}

interface HeroSectionProps {
  featuredArticle: FeaturedArticle | null;
}

// Component

const HeroSection: React.FC<HeroSectionProps> = ({ featuredArticle }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use the native MouseEvent because the listener is attached to `window`
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      parallaxRef.current.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    };

    const createParticles = () => {
      if (!particlesRef.current) return;

      // We might want to clear previous particles, but here we append
      // since this runs only once. (In React Strict Mode it may run
      // twice and cause duplicates; preserving original behavior for simplicity.)

      // Type safety when performing DOM manipulation
      const container = particlesRef.current;

      // If the container already has children, don't append again (Strict Mode fix)
      if (container.childElementCount > 0) return;

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        // particle.className = "particle";
        // particle.style.left = Math.random() * 100 + "%";
        // particle.style.animationDelay = Math.random() * 6 + "s";
        // particle.style.animationDuration = Math.random() * 3 + 3 + "s";
        container.appendChild(particle);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    createParticles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!featuredArticle) return null;

  return (
    <section className="relative mb-8 parallax-container">
      {/* Floating Particles */}
      <div ref={particlesRef} className="floating-particles"></div>

      <div className="relative overflow-hidden rounded-2xl glassmorphism pulsing-glow">
        <div className="aspect-[16/9] md:aspect-[21/9] relative">
          <div ref={parallaxRef} className="parallax-element w-full h-full">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover liquid-transition"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Animated Background Elements */}
          {/*<div className="absolute top-10 right-10 w-20 h-20 rounded-full gradient-bg-primary opacity-20 animate-float"></div>*/}
          {/*<div className="absolute bottom-20 left-10 w-16 h-16 rounded-full gradient-bg-secondary opacity-30 animate-pulse"></div>*/}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white slide-down">
          <div
            className="flex items-center space-x-2 mb-3 stagger-animation"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="px-4 py-2 gradient-bg-primary text-white text-xs font-medium rounded-full pulsing-glow">
              {featuredArticle.category}
            </span>
            <span className="text-xs text-text-secondary">
              Featured Article
            </span>
          </div>

          <Link
            to={`/article-reading?id=${featuredArticle.id}`}
            className="block group"
          >
            <h1
              className="text-2xl md:text-4xl font-heading font-bold mb-3 group-hover:gradient-text-primary transition-all duration-500 stagger-animation"
              style={{ animationDelay: "0.2s" }}
            >
              {featuredArticle.title}
            </h1>
            <p
              className="text-base md:text-lg text-text-secondary mb-4 line-clamp-2 stagger-animation"
              style={{ animationDelay: "0.3s" }}
            >
              {featuredArticle.excerpt}
            </p>
          </Link>

          <div
            className="flex items-center justify-between stagger-animation"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-12 h-12 rounded-full border-2 border-bright-cyan/40 card-3d"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
              </div>
              <div>
                <p className="font-medium text-sm text-white">
                  {featuredArticle.author.name}
                </p>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span>{featuredArticle.publishDate}</span>
                  <span>•</span>
                  <span className="text-interactive">
                    {featuredArticle.readTime} min read
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="morphing-button p-3 bg-dark-navy/50 hover:gradient-bg-primary rounded-full transition-all duration-300 contextual-glow">
                <Icon
                  name="Bookmark"
                  size={16}
                  className="text-text-interactive"
                />
              </button>
              <button className="morphing-button p-3 bg-dark-navy/50 hover:gradient-bg-secondary rounded-full transition-all duration-300 contextual-glow">
                <Icon
                  name="Share2"
                  size={16}
                  className="text-text-interactive"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Decorative SVG Elements */}
        {/*<svg
          className="absolute top-0 right-0 w-32 h-32 text-bright-cyan/10"
          viewBox="0 0 100 100"
        >
          <path
            d="M50,10 L90,90 L10,90 Z"
            fill="currentColor"
            className="animate-pulse"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="20s"
              repeatCount="indefinite"
            />
          </path>
        </svg>*/}
      </div>
    </section>
  );
};

export default HeroSection;
