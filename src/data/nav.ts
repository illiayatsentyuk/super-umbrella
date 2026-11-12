export type NavItem = {
  id: string
  to: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'home', to: '/', label: 'Початок' },
  { id: 'worlds', to: '/svity', label: 'Світи' },
  { id: 'atelier', to: '/verstat', label: 'Верстат' },
  { id: 'manifest', to: '/manifest', label: 'Маніфест' },
]

export const darkRoutes = new Set(['worlds', 'world', 'atelier'])
