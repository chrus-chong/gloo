import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import Footer from '../../components/Footer'

describe('Footer loads correctly', () => {
  let component

  beforeEach(() => {
    component = render(<Footer />)
  })

  afterEach(cleanup)

  it('should render correctly', () => {
    expect(component.getByTestId('footer-copy')).toHaveTextContent(
      'A project by @sbhbenjamin and @chrus-chong'
    )
  })
})
