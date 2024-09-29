describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://192.168.81.17:3000/login");
  });

  it("passes", () => {
    cy.visit("http://192.168.81.17:3000/login");
    //cy.get(":nth-child(1) > :nth-child(1) > .relative").click();
    cy.get("#username").type("admin");
  });
});
