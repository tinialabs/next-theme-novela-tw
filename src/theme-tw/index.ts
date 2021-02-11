import merge from 'lodash/merge'
import { css } from '@twstyled/core'
import colors from './colors'
import tags from './tags'

const themeCommon = `
    --color-prism-background: #292c34;
    --color-prism-highlight: rgba(255,255,255,0.07);
    --color-prism-highlight-border: #e1bde2;
    --font-serif: Merriweather, Georgia, Serif;
    --font-sans-serif: 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif;
    --font-monospace: 'Operator Mono', Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
    --transition-color-mode: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
`

export const layoutStyles = css`
  ${themeCommon}

  body.theme-tw-light & {
    --color-primary: #000;
    --color-secondary: #73737d;
    --color-grey: #73737d;
    --color-accent: #6166dc;
    --color-background: #fafafa;
    --color-hover: rgba(0, 0, 0, 0.07);
    --color-gradient: linear-gradient(
      180deg,
      rgba(217, 219, 224, 0) 0%,
      #d9dbe0 100%
    );
    --color-article-text: #08080b;
    --color-track: rgba(8, 8, 11, 0.3);
    --color-progress: #000;
    --color-card: #fff;
    --color-error: #ee565b;
    --color-success: #46b17b;
    --color-error-background: rgba(238, 86, 91, 0.1);
    --color-horizontal-rule: rgba(8, 8, 11, 0.15);
    --color-input-background: rgba(0, 0, 0, 0.05);
  }

  body.theme-tw-dark & {
    --color-primary: #fff;
    --color-secondary: #fff;
    --color-grey: #73737d;
    --color-accent: #e9daac;
    --color-background: #111216;
    --color-hover: rgba(255, 255, 255, 0.07);
    --color-gradient: linear-gradient(
      180deg,
      #111216 0%,
      rgba(66, 81, 98, 0.36) 100%
    );
    --color-articleText: #fff;
    --color-track: rgba(255, 255, 255, 0.3);
    --color-progress: #fff;
    --color-card: #1d2128;
    --color-error: #ee565b;
    --color-success: #46b17b;
    --color-errorBackground: rgba(238, 86, 91, 0.1);
    --color-horizontalRule: rgba(255, 255, 255, 0.15);
    --color-inputBackground: rgba(255, 255, 255, 0.07);
  }

  body {
    color: var(--color-primary);
    background: var(--color-background);
  }
`

const breakpoints = [
  ['phone_small', 320],
  ['phone', 376],
  ['phablet', 540],
  ['tablet', 735],
  ['desktop', 1070],
  ['desktop_medium', 1280],
  ['desktop_large', 1440]
]

const fonts = {
  serif: "'Merriweather', Georgia, Serif",
  sansSerif:
    "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
  monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`
}

const colorModeTransition =
  'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)'

export default merge({
  initialColorMode: 'light',
  useCustomProperties: true,
  colorModeTransition,
  colors,
  fonts,
  breakpoints,
  tags
})

export * from './util'

export { default as mediaqueries } from './media'
