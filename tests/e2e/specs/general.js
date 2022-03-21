// https://docs.cypress.io/api/introduction/api.html
describe(" Test Login usuario existente ", () => {
  it("Deberia llevar   a la vista principal luego de hace login  ", () => {
    cy.visit("/login")
    cy.contains('h1', 'Iniciar Sesión')
	cy.get('#email').type('mariapilar.abarca@gmail.com')
	cy.get('#password').type('12345678')
	cy.get ('#iniciarLogin').click()
	cy.url().should('eq', 'http://localhost:8080/home' )

	cy.contains('h1', 'Lista de Trabajadores')
	cy.wait(5000)
	cy.visit("/formulario")
	cy.wait(5000)
	cy.contains('h1', 'Registro de trabajador')
	cy.get('#nombre').type('Maria')
	cy.wait(2000)
	cy.get('#apellido').type('Gonzalez')
	cy.wait(2000)
	cy.get('#rut').type('12.765.563-8')
	cy.wait(2000)
	cy.get('#cargo').type('Administradora')
	cy.wait(2000)
	
	// // cy.get('#odip').type('odi.pdf')
	// cy.wait(2000)
	// cy.get('#fecha1').type('2022-01-24')
	// cy.wait(2000)
	// cy.get('#fecha2').type('2022-04-24')
	// cy.wait(2000)
	// // cy.get('#reg1').type('reglamento_Interno.pdf')
	// cy.wait(2000)
	// cy.get('#fecha3').type('2022-02-24')
	cy.wait(5000)
	cy.visit("/ubicacion")
	cy.wait(5000)
	cy.visit("/prueba")
	cy.wait(5000)
	cy.get('#nav-logout-btn').click()
	cy.wait(5000)
	cy.get ('#forgotPassword').click()
	cy.get('#email1').type('mariaabarca@gmail.com')
	cy.get ('#btn-password').click()
	cy.wait(2000)
	cy.visit("/login")
  });

});


