/**
 * Helper function to determine pager overflow state for scrollable containers.
 * Uses sub-pixel tolerance to handle high-DPI displays and browser zoom.
 */

export function isOverflowActive(
  container: HTMLElement | null,
  scrollThreshold: number = 40,
  remainingThreshold: number = 35
): boolean {
  if (!container) return false
  const scrollHeight = container.scrollHeight
  const clientHeight = container.clientHeight
  const scrollTop = container.scrollTop

  const scrollableDistance = scrollHeight - clientHeight
  // Use Math.ceil to protect against sub-pixel fractional scrolling discrepancies
  const remainingScroll = scrollableDistance - Math.ceil(scrollTop)

  return scrollableDistance > scrollThreshold && remainingScroll > remainingThreshold
}
