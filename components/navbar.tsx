"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl flex-col px-5 py-3 transition-all duration-500 md:flex-row md:items-center md:justify-between md:px-7 ${
          scrolled || mobileMenuOpen ? "glass" : "bg-transparent"
        } ${mobileMenuOpen ? "rounded-[24px]" : "rounded-full"}`}
      >
        <div className="flex w-full items-center justify-between md:w-auto">
          <a href="#home" className="flex items-center gap-2 font-mono text-base font-bold tracking-[0.65em] text-foreground">
            {/* <div className="relative h-6 w-6 overflow-hidden rounded bg-white p-0.5 shadow-sm border border-border/10 flex items-center justify-center">
              <img src="/logo.jpg" alt="VELLOX Logo" className="h-full w-full object-contain" />
            </div> */}
            VELLOX
          </a>
          
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="#contact"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_oklch(0.62_0.16_250_/_0.7)]"
            >
              Start
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/20 bg-secondary/50 text-foreground transition-colors hover:bg-secondary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="relative text-sm font-semibold text-foreground transition-colors hover:text-primary dark:text-foreground/90 dark:hover:text-primary drop-shadow-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-6px_oklch(0.62_0.16_250_/_0.7)]"
          >
            Start
          </a>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden md:hidden w-full"
            >
              <ul className="flex flex-col gap-4 pt-4 pb-2 border-t border-border/10 mt-3">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-medium text-foreground py-1 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

