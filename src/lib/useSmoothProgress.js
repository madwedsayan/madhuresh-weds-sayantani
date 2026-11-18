import { useScroll, useSpring } from 'framer-motion'

/**
 * scrollYProgress for a target, eased through a critically-damped spring so parallax glides
 * instead of stepping with each mouse-wheel notch / touch flick.
 */
export default function useSmoothProgress(ref, offset) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35, restDelta: 0.0005 })
}
