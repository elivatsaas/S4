import React from "react";
import AnnouncementMessage from "../../src/components/AnnouncementMessage";

describe("<AnnouncementMessage />", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://ec2-13-52-252-101.us-west-1.compute.amazonaws.com:8080/api/v1/employees/10",
      {
        statusCode: 200,
        body: {
          employee: {
            id: 10,
            firstName: "John",
            lastName: "Doe",
          },
        },
      }
    ).as("getEmployee");
  });

  it("renders announcement message with correct employee name", () => {
    let employee = {
      id: 10,
      firstName: "System",
      lastName: "Announcement",
    };

    cy.mount(
      <AnnouncementMessage text="Test announcement" employee={employee} />
    );

    cy.contains("Test announcement").should("be.visible");

    cy.contains(`Sent by: ${employee.firstName} ${employee.lastName}`).should(
      "be.visible"
    );
  });
});
