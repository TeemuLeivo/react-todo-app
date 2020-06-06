describe("Create item", () => {
  it("Creates and deletes a todo item", () => {
    cy.on("window:confirm", () => true); // This is used for delete
    cy.visit("http://localhost:3000");
    const randomId = Math.floor(Math.random() * 1000000000);
    const itemName = "Myitem" + randomId;
    cy.get("#newItemInput").type(itemName);
    cy.contains("Add item").click();
    cy.contains(itemName)
      .siblings()
      .contains("Delete")
      .click();
    cy.contains(itemName).should('not.exist');
  });
});
