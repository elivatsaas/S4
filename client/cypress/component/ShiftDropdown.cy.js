import React from "react";
import ShiftDropdown from "../../src/components/dropdowns/ShiftDropdown";
import shiftsData from "../fixtures/shifts.json";

describe("<ShiftDropdown />", () => {
  it("renders", () => {
    cy.mount(
      <ShiftDropdown
        shifts={shiftsData}
        toggleDropdown={true}
        isOpen={true}
        onSelectShift={() => {}}
      />
    );

    cy.get(".dropdown-label").should("have.length", shiftsData.length);
    shiftsData.forEach((shift, index) => {
      cy.get(`.dropdown-label:eq(${index})`).should(
        "have.text",
        `On ${shift.date.substring(0, 10)} At ${shift.startTime}`
      );

      cy.get(`.dropdown-label:eq(${index}) input[type="checkbox"]`).should(
        "exist"
      );
    });
  });
});
