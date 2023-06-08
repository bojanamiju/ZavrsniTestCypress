/// <reference types='cypress' />


describe ('Test login form', () => {

    it('Test login with all valid inputs', () => {

        cy.visit('https://cypress.vivifyscrum-stage.com/login')

        cy.get('[type="email"]').type('bojana.marinkovicbm@gmail.com');
        cy.get('[type="password"]').type('Ficentije23');
        cy.get('[type="submit"]').click();

        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations');
        cy.url().should('not.contain', 'login');

    })

    it('Test login with empty email -  NEG', () => {

        cy.visit('https://cypress.vivifyscrum-stage.com/login')

        cy.get('[type="password"]').type('Ficentije23');
        cy.get('[type="submit"]').click();

        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        cy.url().should('not.contain', 'my-organizations');
        cy.get('[type="submit"]').should('be.visible');
        

    })

    it('Test login with empty password -  NEG', () => {

        cy.visit('https://cypress.vivifyscrum-stage.com/login')

        cy.get('[type="email"]').type('bojana.marinkovicbm@gmail.com');
        cy.get('[type="submit"]').click();

        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        cy.url().should('not.contain', 'my-organizations');
        cy.get('[type="submit"]').should('be.visible');

    })

    it('Test login with unregestred email - NEG', () => {

        cy.visit('https://cypress.vivifyscrum-stage.com/login')

        cy.get('[type="email"]').type('bojana@gmail.com');
        cy.get('[type="password"]').type('Ficentije23');
        cy.get('[type="submit"]').click();

        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        cy.url().should('not.contain', 'my-organizations');
        cy.get('[type="submit"]').should('be.visible');


    })

    it('Test login with wrong password - NEG', () => {

        cy.visit('https://cypress.vivifyscrum-stage.com/login')

        cy.get('[type="email"]').type('bojana.marinkovicbm@gmail.com');
        cy.get('[type="password"]').type('bojana123');
        cy.get('[type="submit"]').click();

        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        cy.url().should('not.contain', 'my-organizations');
        cy.get('[type="submit"]').should('be.visible');
        cy.get('.vs-c-custom-errors > .el-form-item__error').should('contain', 'Oops! Your email/password combination is incorrect');

        //cy.get(".btn.btn-custom").contains('Submit');

        ///cy.log(cy.get('span'.contains('Add New')))

    })

    it('Test login with wrong password - NEG', () => {

        cy.visit('https://cypress.vivifyscrum-stage.com/login')

        cy.get('[type="email"]').type('bojana.marinkovicbm@gmail.com');
        cy.get('[type="password"]').type('bojana123');
        cy.get('[type="submit"]').click();

        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        cy.url().should('not.contain', 'my-organizations');
        cy.get('[type="submit"]').should('be.visible');
        cy.get('.vs-c-custom-errors > .el-form-item__error').should('contain', 'Oops! Your email/password combination is incorrect');

        //cy.get(".btn.btn-custom").contains('Submit');

    })


})

describe ('Create new board', () => {

    beforeEach('Login to page', () =>{
        cy.visit('https://cypress.vivifyscrum-stage.com/login')
        cy.get('[type="email"]').type('bojana.marinkovicbm@gmail.com');
        cy.get('[type="password"]').type('Ficentije23');
        cy.get('[type="submit"]').click();
    })

    it.only('Create new board', () => {

        cy.get('[title="Add new Board"]').click();
        cy.get('[name="name"]').type('Bojanina tabla')
        cy.get('[name="next_btn"]').click();
        cy.get('[name="type_scrum"]').click();
        cy.get('[name="next_btn"]').click();
        cy.get('[name="next_btn"]').click();
        cy.wait(2000);
        cy.get('[name="next_btn"]').click();
        cy.wait(2000);
        cy.get('[name="next_btn"]').click();

        cy.get('.vs-c-list__btn > :nth-child(3)').should('contain', 'Bojanina tabla');

        //cy.get('.vs-c-list__btn > :nth-child(3)').click();
        //cy.get('span').contains('Bojanina tabla').click();
        cy.get('body > div.collapsed-sidebar.vs-theme-light > div > main > div.vs-l-project__menu > ul > li:nth-child(10) > span > div > a').click();
        
        cy.get('.vs-c-btn.vs-c-btn--warning.vs-c-btn--spaced').click()
        cy.get('.vs-u-text--right > .el-button--success').click();

        cy.get('.vb-content').should('not.contain', 'Bojanina tabla');
        cy.get('.vs-c-organization-boards__item--add-new').should('be.visible');



    })



})