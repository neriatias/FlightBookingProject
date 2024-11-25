describe('Homepage Tests', () => {
  it('Should load the homepage', () => {
    cy.visit('/'); // ניגש לכתובת ה-baseUrl שהגדרת
    cy.contains('New'); // בודק אם יש אלמנט עם טקסט "Welcome"
  });
});
