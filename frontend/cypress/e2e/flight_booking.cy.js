describe('Flight Booking Tests', () => {
    beforeEach(() => {
      cy.visit('/'); // ניגש לעמוד הראשי
    });
  
    it('Should open booking form when clicking "Book Now"', () => {
      // מאתר את כפתור "Book Now" הראשון ולוחץ עליו
      cy.get('.flight-card').first().contains('Book Now').click();
      // מאמת שטופס ההזמנה נפתח
      cy.contains('Book Flight').should('be.visible');
      cy.get('input[placeholder="Passenger Name"]').should('exist');
      cy.get('input[placeholder="Seat Number"]').should('exist');
    });
  
    it('Should cancel booking when clicking "Cancel"', () => {
      cy.get('.flight-card').first().contains('Book Now').click();
      cy.contains('Cancel').click(); // לוחץ על כפתור הביטול
      // מאמת שטופס ההזמנה נסגר
      cy.contains('Book Flight').should('not.exist');
    });
  
    it('Should fill and confirm booking form', () => {
      cy.get('.flight-card').first().contains('Book Now').click();
      cy.get('input[placeholder="Passenger Name"]').type('John Doe'); // ממלא את שם הנוסע
      cy.get('input[placeholder="Seat Number"]').type('12A'); // ממלא את מספר המושב
      cy.contains('Confirm Booking').click(); // לוחץ על אישור
      // מאמת שהודעת אישור מופיעה
      cy.contains('Booking confirmed for John Doe').should('be.visible');
    });
  
    it('Should filter flights using search', () => {
      cy.get('input[placeholder="Search flights"]').type('New York'); // מחפש "New York"
      // בודק שמוצגת רק הטיסה שמתאימה לחיפוש
      cy.get('.flight-card').should('have.length', 1);
      cy.get('.flight-card').contains('New York to Los Angeles'); // מאמת שהטיסה הנכונה מוצגת
    });
  });
  