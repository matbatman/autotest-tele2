describe('Auth by password', () => {
  const loginPopupContext = `#keycloakLoginModal[data-dialog-type="keycloakLoginModal"]`;
  const formContextSelector = `${loginPopupContext} .keycloak-login-form`;
  const passwordLoginFormContext = `${loginPopupContext} form.keycloak-login-form--password`;

  before(() => {
    browser.url('/');
    // HACK: hide "allow notifications popup"
    browser.execute(() => {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
        .flocktory-widget-overlay {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }`;
      document.getElementsByTagName('head')[0].appendChild(style);
    });
  });

  it('open login popup', () => {
    const signInButtonSelector = `.page .navigation-container .actions-container .login-action-new`;

    browser.waitForVisible(signInButtonSelector);
    browser.click(signInButtonSelector);
  });

  it('wait for visible of login form', () => {
    browser.waitForVisible(formContextSelector);
  });

  it('fill phone field', () => {
    browser.waitForVisible(`${formContextSelector} .phone-field input`);
    browser.click(`${formContextSelector} .phone-field input`);
    browser.setValue(`${formContextSelector} .phone-field input`, process.env.CLIENT_PHONE);
  });

  it('submit form', () => {
    // TODO: check errors on phone field
    browser.waitForEnabled(`${formContextSelector} button[type="submit"]`);
    browser.click(`${formContextSelector} button[type="submit"]`);
  });

  it('wait for code from sms input field', () => {
    browser.waitForVisible(`${formContextSelector} .code-field`);
  });

  it('open "other login options"', () => {
    // TODO: bad selector, maybe use XPath on text
    const otherLoginOptionsSelector = `${formContextSelector} button.keycloak-login-form__button`;

    browser.waitForVisible(otherLoginOptionsSelector);
    browser.click(otherLoginOptionsSelector);
  });

  it('wait for password login form', () => {
    browser.waitForVisible(passwordLoginFormContext);
  });

  it('fill password', () => {
    const passwordFieldSelector = `${passwordLoginFormContext} input[type="password"]`;

    browser.waitForEnabled(passwordFieldSelector);
    browser.setValue(passwordFieldSelector, process.env.CLIENT_PASSWORD);
  });

  // TODO: check errors on password field
  it('submit login form with phone and password', () => {
    const submitFormButton = `${formContextSelector} button[type="submit"]`;

    browser.waitForEnabled(submitFormButton);
    browser.click(submitFormButton);
  });

  it('check url after login', () => {
    browser.waitUntil(() => /\/lk$/.test(browser.getUrl()), 30 * 1000, "Can't login", 1000);
  });
});
