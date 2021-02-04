import { useContext, createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Theme, ColorMode } from '@/theme/types'
import { applyColorMode, useColorModeState } from './use-color-mode'

export interface ThemeContextProps {
  theme: Theme
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: {} as Theme,
  colorMode: 'light',
  setColorMode: null
})

const useThemeTw = () => useContext(ThemeContext)
export const useTheme = () => {
  const { theme } = useThemeTw()
  return theme
}

export function useColorMode<T extends string = string>(): [
  T,
  Dispatch<SetStateAction<T>>
] {
  const { colorMode, setColorMode } = useThemeTw()

  // We're allowing the user to specify a narrower type for its color mode name.
  return ([colorMode, setColorMode] as unknown) as [
    T,
    Dispatch<SetStateAction<T>>
  ]
}

export const ThemeProvider: React.FC<{ theme: Theme }> = ({
  theme,
  children
}) => {
  const [colorMode, setColorMode] = useColorModeState(theme)

  const appliedTheme = applyColorMode(theme || ({} as Theme), colorMode)

  const context = {
    theme: appliedTheme,
    colorMode,
    setColorMode
  }

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  )
}
