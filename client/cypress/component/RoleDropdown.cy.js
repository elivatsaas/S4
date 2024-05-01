import React from "react";
import RoleDropdown from "../../src/components/dropdowns/RoleDropdown";
import rolesData from "../fixtures/roles.json"; // Import roles data from roles.json file

describe("<RoleDropdown />", () => {
  it("renders", () => {
    // Mount the component with the roles data from roles.json
    cy.mount(
      <RoleDropdown
        roles={rolesData}
        toggleDropdown={() => {}}
        isOpen={true}
        onSelectRole={() => {}}
        selectedRoles={[]}
      />
    );

    cy.get(".dropdown-label").should("have.length", rolesData.length);
    rolesData.forEach((role, index) => {
      cy.get(`.dropdown-label:eq(${index})`).should("have.text", role.roleName);

      cy.get(`.dropdown-label:eq(${index}) input[type="checkbox"]`).should(
        "exist"
      );
    });
  });
});
