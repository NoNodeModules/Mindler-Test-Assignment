describe("Pizza Builder Tests", function () {

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            Cypress.runner.stop()
        }
    });

    it('Open URL', () => {
        cy.visit("http://stanislavv.ca/React/PizzaMaker1/");
    })

    it('Verify the number of available inredietns, add them and validate that they are added', () => {
        cy.xpath('.//div[@class="descriptionContainer"]').should('have.length', 7);
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 1);
        cy.xpath('(.//button[@data-type="plus"])[1]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 2);
        cy.xpath('(.//button[@data-type="plus"])[2]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 3);
        cy.xpath('(.//button[@data-type="plus"])[3]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 4);
        cy.xpath('(.//button[@data-type="plus"])[4]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 5);
        cy.xpath('(.//button[@data-type="plus"])[5]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 6);
        cy.xpath('(.//button[@data-type="plus"])[6]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 7);
        cy.xpath('(.//button[@data-type="plus"])[7]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 8);
    })

    it('Remove pizza ingredients and validate that they are removed', () => {
        cy.xpath('.//button[@data-type="minus"]').should('have.length', 7);
        cy.xpath('(.//button[@data-type="minus"])[1]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 7);
        cy.xpath('(.//button[@data-type="minus"])[2]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 6);
        cy.xpath('(.//button[@data-type="minus"])[3]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 5);
    })

    it('Same ingredient counter validation', () => {
        cy.xpath('(.//button[@data-type="plus"])[1]').click();
        cy.xpath('(.//button[@data-type="plus"])[1]').click();
        cy.xpath('(.//button[@data-type="plus"])[1]').click();
        cy.xpath('(.//button[@data-type="plus"])[1]').click();
        cy.get('input').should('have.attr', 'value', '4');
        cy.xpath('(.//button[@data-type="minus"])[1]').click();
        cy.get('input').should('have.attr', 'value', '3');
    })

    it('Reset Pizza and validate that Checkout button is disabled', () => {
        cy.xpath('.//button[contains(@class,"warning")]').contains("Reset pizza").should('have.length', 1).click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 1);
        cy.xpath('.//button[contains(@class,"disabled")]').contains("Checkout").should('have.length', 1);
    })

    it('Total values validation and Checkout button is enabled', () => {
        cy.xpath('(.//button[@data-type="plus"])[1]').click();
        cy.xpath('.//div[contains(@class,"ingredientContainer")]').should('have.length', 2);
        cy.xpath(".//li[span[text() = 'Total']]/strong").contains("8.00$");
        cy.xpath('.//span[contains(@class,"badge-pill")]').contains("8.00$");
        cy.xpath('.//button[contains(@class,"primary")]').should('have.length', 1);
    })

    it('Checkout and validate number of ingredients and total value', () => {
        cy.xpath('.//button[contains(@class,"primary")]').click();
        cy.xpath('.//div[@class="whiteRectangle"]').should('have.length', 1);
        cy.xpath('(.//div[@class="whiteRectangle"]/h3)[2]').contains("Total price: 8.00$");
        cy.xpath('.//div[@class="whiteRectangle"]/ul/li').should('have.length', 1);
        cy.xpath('.//div[@class="whiteRectangle"]/ul/li').contains("Cold cuts: 1");
    })

    it('Cancel button and validate that Checkout popup is closed', () => {
        cy.xpath('.//button[contains(@class,"dark")]').click();
        cy.xpath('.//div[@class="whiteRectangle"]').should('have.length', 0);
    })

    it('Complete the order and validate the alert message', () => {
        cy.xpath('.//button[contains(@class,"primary")]').click();
        cy.xpath('.//div[@class="whiteRectangle"]').should('have.length', 1);
        cy.xpath('(.//div[@class="whiteRectangle"]/h3)[2]').contains("Total price: 8.00$");
        cy.xpath('.//div[@class="whiteRectangle"]/ul/li').should('have.length', 1);
        cy.xpath('.//div[@class="whiteRectangle"]/ul/li').contains("Cold cuts: 1");

        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.get('button').contains('Continue').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('You continue!')
            })
    })

})