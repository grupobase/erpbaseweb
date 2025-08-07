"use client"

import type React from "react"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToElement = useCallback((elementId: string, offset = 80) => {
    const element = document.getElementById(elementId)
    if (!element) return

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    // Check if browser supports smooth scrolling
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    } else {
      // Fallback for browsers that don't support smooth scrolling
      smoothScrollPolyfill(offsetPosition)
    }
  }, [])

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Only handle hash links
      if (!href.startsWith("#")) return

      e.preventDefault()
      const elementId = href.substring(1)
      scrollToElement(elementId)

      // Update URL without triggering page reload
      window.history.pushState(null, "", href)
    },
    [scrollToElement],
  )

  return { scrollToElement, handleAnchorClick }
}

// Polyfill for smooth scrolling in older browsers
function smoothScrollPolyfill(targetPosition: number) {
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 800
  let start: number | null = null

  function animation(currentTime: number) {
    if (start === null) start = currentTime
    const timeElapsed = currentTime - start
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  // Easing function for smooth animation
  function ease(t: number, b: number, c: number, d: number) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}
