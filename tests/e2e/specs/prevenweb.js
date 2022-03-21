describe(" Test prevenWeb existente ", () => {
	it("testing de titulo ", () => {
	cy.visit("/")
	cy.contains('h1', 'Bienvenido a PrevenWeb')
});


	//CONTACTO
	// seleccionar los inputs y el boton que agregamo texto
	it("seleccionar los inputs y el boton que agregamo texto ", () => {
	cy.get('#name').type('mi nombre')
	cy.get('#email').type(' maria@gmail.com')
	cy.get('#message').type('esta es un mesaje de prueba')
	// cy.get('#btn-enviar').click()
	});
  });
  