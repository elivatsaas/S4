import React from "react";
import EmployeeScheduleCalendar from "../../src/components/Schedule";
import shiftsData from "../fixtures/formattedShifts.json"; // Import shifts data from shifts.json file

describe("<EmployeeScheduleCalendar />", () => {
  beforeEach(() => {
    // Calculate earliestStartTime, latestEndTime, and earliestDate before each test
    const earliestStartTime = Math.min(
      ...shiftsData.map((shift) => new Date(shift.start).getTime())
    );
    const latestEndTime = Math.max(
      ...shiftsData.map((shift) => new Date(shift.end).getTime())
    );
    const earliestDate = new Date(
      Math.min(
        ...shiftsData.map((shift) => new Date(shift.start).setHours(0, 0, 0, 0))
      )
    );

    // Define the props for the EmployeeScheduleCalendar component
    const props = {
      defaultView: "day",
      views: ["day", "week", "month"], // Allow all view types
      step: 30,
      timeslots: 2,
      min: earliestStartTime,
      max: latestEndTime,
      defaultDate: earliestDate, // Start of the week containing the earliest shift
      eventPropGetter: (event) => ({
        className: event.employeeId ? "employee" : "no-employee",
      }),
      style: {
        height: "calc(120vh - 100px)", // Adjust the height of the calendar container
        zIndex: 1, // Ensure the calendar is on top of other elements
      },
      dayLayoutAlgorithm: "no-overlap",
    };

    // Mount the component before each test with the defined props
    cy.mount(<EmployeeScheduleCalendar {...props} shiftsData={shiftsData} />);
  });

  it("renders", () => {
    // Ensure the calendar container is visible
    cy.get(".schedule-container").should("be.visible");
    // Check if the "Loading..." text exists and then ensure it doesn't
    cy.contains("Loading...").should("not.exist");
  });

  it("displays shift information on event select", () => {
    // Ensure the calendar container is visible
    cy.get(".schedule-container").should("be.visible");
    // Wait for the calendar events to be rendered
    cy.get(".rbc-event").should("exist"); // Check if .rbc-event exists
    // Click on the first event
    cy.get(".rbc-event").first().trigger("click", { force: true });
    // Ensure that the popup exists
    cy.get(".popup").should("exist");
    // Check if the shift information is displayed correctly
    cy.contains("Shift Information").should("exist");
    cy.contains("Employee:").should("exist");
    cy.contains("Role:").should("exist");
    cy.contains("Store:").should("exist");
    cy.contains("Start:").should("exist");
    cy.contains("End:").should("exist");
  });
});
