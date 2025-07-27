import { render, screen } from '@testing-library/react'
import TranslatedHeader from '../TranslatedHeader'

// Mock the hooks
jest.mock('../../hooks/useHeaderTranslations', () => ({
  useHeaderTranslations: () => ({
    translations: {
      logo: 'Boujebli Meuble',
      home: 'Accueil',
      ourProducts: 'Nos Produits',
      kitchens: 'Cuisines',
      doors: 'Portes',
      dressing: 'Dressing',
      furniture: 'Meubles',
      contact: 'Contact',
      catalogue: 'Catalogue',
    },
  }),
}))

describe('TranslatedHeader', () => {
  it('renders the header with logo', () => {
    render(<TranslatedHeader />)
    expect(screen.getByText('Boujebli Meuble')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<TranslatedHeader />)
    expect(screen.getByText('Accueil')).toBeInTheDocument()
    expect(screen.getByText('Nos Produits')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Catalogue')).toBeInTheDocument()
  })

  it('has correct navigation structure', () => {
    render(<TranslatedHeader />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
}) 