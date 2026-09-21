/**
 * Helper function to determine pager overflow state for scrollable containers.
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
  const remainingScroll = scrollableDistance - scrollTop

  return scrollableDistance > scrollThreshold && remainingScroll > remainingThreshold
}
