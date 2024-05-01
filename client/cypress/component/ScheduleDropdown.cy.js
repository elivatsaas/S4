import React from "react";
import ScheduleDropdown from "../../src/components/dropdowns/ScheduleDropdown";
import schedulesData from "../fixtures/schedules.json"; // Import schedules data from schedules.json file

describe("<ScheduleDropdown />", () => {
  it("renders", () => {
    // Mount the component with the schedules data from schedules.json
    cy.mount(
      <ScheduleDropdown
        schedules={schedulesData}
        toggleDropdown={true}
        isOpen={true}
        onSelectSchedule={() => {}}
        selectedSchedules={[]}
      />
    );

    cy.get(".dropdown-label").should("have.length", schedulesData.length);
    schedulesData.forEach((schedule, index) => {
      cy.get(`.dropdown-label:eq(${index})`).should(
        "have.text",
        `${schedule.scheduleName || "Schedule ID: " + schedule.id}`
      );

      cy.get(`.dropdown-label:eq(${index}) input[type="checkbox"]`).should(
        "exist"
      );
    });
  });
});
