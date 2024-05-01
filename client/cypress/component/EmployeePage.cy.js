import React from 'react'
import EmployeePage from '../../src/pages/EmployeePage'

describe('<EmployeePage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EmployeePage />)
  })
})