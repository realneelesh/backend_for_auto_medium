const classSellector = (classString) => {
  return `.${classString.replaceAll(' ', '.')}`;
}

const blogs = require('../../blogs.json');
const loginLinkObj = require('../../inputs/login_link.json');

describe('template spec', () => {
  it('passes', () => {
    cy.visit(loginLinkObj.link);

    blogs.map((blog) => {
      cy.get('div').contains('Write').click({force: true});

      cy.get(`p${classSellector('graf graf--p graf-after--h3 graf--trailing is-selected')}`).invoke('html', blog.content);
      cy.get(`h3${classSellector('graf graf--h3 graf--leading graf--title')}`).invoke('html', blog.title);
      cy.wait(10000);

      cy.get('button').contains('Publish').click();
      cy.get('button').contains('Publish now').click();
      cy.wait(10000);
    })
  })
})



