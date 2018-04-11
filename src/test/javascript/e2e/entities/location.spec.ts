import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Location e2e test', () => {

    let navBarPage: NavBarPage;
    let locationDialogPage: LocationDialogPage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locations', () => {
        navBarPage.goToEntity('location');
        locationComponentsPage = new LocationComponentsPage();
        expect(locationComponentsPage.getTitle())
            .toMatch(/Locations/);

    });

    it('should load create Location dialog', () => {
        locationComponentsPage.clickOnCreateButton();
        locationDialogPage = new LocationDialogPage();
        expect(locationDialogPage.getModalTitle())
            .toMatch(/Create or edit a Location/);
        locationDialogPage.close();
    });

    it('should create and save Locations', () => {
        locationComponentsPage.clickOnCreateButton();
        locationDialogPage.setLocationNameInput('locationName');
        expect(locationDialogPage.getLocationNameInput()).toMatch('locationName');
        locationDialogPage.skuSelectLastOption();
        locationDialogPage.save();
        expect(locationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LocationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-location div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LocationDialogPage {
    modalTitle = element(by.css('h4#myLocationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    locationNameInput = element(by.css('input#field_locationName'));
    skuSelect = element(by.css('select#field_sku'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setLocationNameInput = function(locationName) {
        this.locationNameInput.sendKeys(locationName);
    };

    getLocationNameInput = function() {
        return this.locationNameInput.getAttribute('value');
    };

    skuSelectLastOption = function() {
        this.skuSelect.all(by.tagName('option')).last().click();
    };

    skuSelectOption = function(option) {
        this.skuSelect.sendKeys(option);
    };

    getSkuSelect = function() {
        return this.skuSelect;
    };

    getSkuSelectedOption = function() {
        return this.skuSelect.element(by.css('option:checked')).getText();
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
