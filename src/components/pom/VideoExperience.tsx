import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { createPortal } from "react-dom";

function VideoExperience() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFloating, setShowFloating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloating(!entry.isIntersecting && !isHidden);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHidden]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", updateTime);
    return () => video.removeEventListener("timeupdate", updateTime);
  }, []);

  const handleClose = useCallback(() => {
    setIsHidden(true);
    setShowFloating(false);
  }, []);

  const handleExpand = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleMinimize = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      {/* Hero Video Section */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-luxury-black">
        <video
          ref={videoRef}
          src="/assets/video1.mp4"
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/30 to-luxury-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-luxury-black/50 via-transparent to-luxury-black/50" />
      </div>

      {/* Floating Video Player */}
      <AnimatePresence>
        {showFloating && !showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10"
          >
            <div
              className="group relative w-[220px] h-[124px] sm:w-[280px] sm:h-[158px] md:w-[320px] md:h-[180px] overflow-hidden rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_-15px_rgba(201,168,108,0.3)] transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={handleExpand}
            >
              <video
                src="/assets/video1.mp4"
                className="size-full object-cover"
                muted
                playsInline
                autoPlay
                loop
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-2xl group-hover:border-gold/30 transition-colors duration-300" />

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-2 right-2 z-10 size-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all duration-200"
              >
                <X className="size-3" />
              </button>

              {/* Expand Icon */}
              <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="size-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70">
                  <Maximize2 className="size-3" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {showModal && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={handleMinimize}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(201,168,108,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src="/assets/video1.mp4"
                className="size-full object-cover"
                controls
                autoPlay
                playsInline
              />

              {/* Close Button */}
              <button
                onClick={handleMinimize}
                className="absolute top-4 right-4 z-10 size-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all duration-200"
              >
                <Minimize2 className="size-5" />
              </button>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}

export { VideoExperience };
