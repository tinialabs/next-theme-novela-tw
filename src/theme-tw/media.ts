/* eslint-disable @typescript-eslint/naming-convention */
const breakpoints: [string, number][] = [
  ['phone_small', 320],
  ['phone', 376],
  ['phablet', 540],
  ['tablet', 735],
  ['desktop', 1070],
  ['desktop_medium', 1280],
  ['desktop_large', 1440]
]

const toEm = (size: number) => size / 16 + 'em'

/**
 * All breakpoints can be found inside of theme.breakpoints.
 * Each is turned in to a min + 1 and max-width version.
 *
 * There are also break points to cover coarse and fine pointer devices
 *
 * @example
 *
 *    ${mediaqueries.phone} { width: 100px; };
 *    ${mediaqueries.tablet_up} { width: 200px; border: 10px };
 */

const mediaqueries = breakpoints.reduce(
  (acc, [label, size], i) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: `@media (max-width: ${toEm(size)})`,
    // min-width media query e.g. mediaqueries.desktop_up
    // This is the breakpoint prior's size +1
    [`${label}_up`]:
      i > 0
        ? `@media (min-width: ${toEm(breakpoints[i - 1][1] + 1)})`
        : `@media (min-width: 0px)`
  }),
  {}
) as MediaQueries

export const media = mediaqueries

export default mediaqueries

interface MediaQueries {
  phone_small: string
  phone: string
  phablet: string
  tablet: string
  desktop: string
  desktop_medium: string
  desktop_large: string
  phone_small_up: string
  phone_up: string
  phablet_up: string
  tablet_up: string
  desktop_up: string
  desktop_medium_up: string
  desktop_large_up: string
}
