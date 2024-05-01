import React from "react";
import EmployeeDropdown from "../../src/components/dropdowns/EmployeeDropdown";
import employeesData from "../fixtures/employees.json";

describe("<EmployeeDropdown />", () => {
  it("renders", () => {
    cy.mount(
      <EmployeeDropdown employees={employeesData} toggleDropdown={true} />
    );

    cy.get(".dropdown-label").should("have.length", employeesData.length);
    employeesData.forEach((employee, index) => {
      cy.get(`.dropdown-label:eq(${index})`).should(
        "have.text",
        `${employee.firstName} ${employee.lastName}`
      );
      cy.get(`.dropdown-label:eq(${index}) input[type="checkbox"]`).should(
        "exist"
      );
    });
  });
});
