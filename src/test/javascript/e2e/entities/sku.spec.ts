import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Sku e2e test', () => {

    let navBarPage: NavBarPage;
    let skuDialogPage: SkuDialogPage;
    let skuComponentsPage: SkuComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Skus', () => {
        navBarPage.goToEntity('sku');
        skuComponentsPage = new SkuComponentsPage();
        expect(skuComponentsPage.getTitle())
            .toMatch(/Skus/);

    });

    it('should load create Sku dialog', () => {
        skuComponentsPage.clickOnCreateButton();
        skuDialogPage = new SkuDialogPage();
        expect(skuDialogPage.getModalTitle())
            .toMatch(/Create or edit a Sku/);
        skuDialogPage.close();
    });

    it('should create and save Skus', () => {
        skuComponentsPage.clickOnCreateButton();
        skuDialogPage.setSkuDescInput('skuDesc');
        expect(skuDialogPage.getSkuDescInput()).toMatch('skuDesc');
        skuDialogPage.save();
        expect(skuDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SkuComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sku div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SkuDialogPage {
    modalTitle = element(by.css('h4#mySkuLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    skuDescInput = element(by.css('input#field_skuDesc'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setSkuDescInput = function(skuDesc) {
        this.skuDescInput.sendKeys(skuDesc);
    };

    getSkuDescInput = function() {
        return this.skuDescInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
