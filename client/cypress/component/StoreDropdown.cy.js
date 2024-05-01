import React from "react";
import StoreDropdown from "../../src/components/dropdowns/StoreDropdown";
import storesData from "../fixtures/stores.json"; // Import stores data from stores.json file

describe("<StoreDropdown />", () => {
  it("renders", () => {
    // Mount the component with the stores data from stores.json
    cy.mount(
      <StoreDropdown
        stores={storesData}
        toggleDropdown={() => {}}
        isOpen={true}
        onSelectStore={() => {}}
        selectedStores={[]}
      />
    );

    cy.get(".dropdown-label").should("have.length", storesData.length);
    storesData.forEach((store, index) => {
      cy.get(`.dropdown-label:eq(${index})`).should(
        "have.text",
        store.storeName
      );

      cy.get(`.dropdown-label:eq(${index}) input[type="checkbox"]`).should(
        "exist"
      );
    });
  });
});
