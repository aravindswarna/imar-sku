import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SubCategory e2e test', () => {

    let navBarPage: NavBarPage;
    let subCategoryDialogPage: SubCategoryDialogPage;
    let subCategoryComponentsPage: SubCategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SubCategories', () => {
        navBarPage.goToEntity('sub-category');
        subCategoryComponentsPage = new SubCategoryComponentsPage();
        expect(subCategoryComponentsPage.getTitle())
            .toMatch(/Sub Categories/);

    });

    it('should load create SubCategory dialog', () => {
        subCategoryComponentsPage.clickOnCreateButton();
        subCategoryDialogPage = new SubCategoryDialogPage();
        expect(subCategoryDialogPage.getModalTitle())
            .toMatch(/Create or edit a Sub Category/);
        subCategoryDialogPage.close();
    });

    it('should create and save SubCategories', () => {
        subCategoryComponentsPage.clickOnCreateButton();
        subCategoryDialogPage.setSubcategoryInput('subcategory');
        expect(subCategoryDialogPage.getSubcategoryInput()).toMatch('subcategory');
        subCategoryDialogPage.categorySelectLastOption();
        subCategoryDialogPage.save();
        expect(subCategoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubCategoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sub-category div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class SubCategoryDialogPage {
    modalTitle = element(by.css('h4#mySubCategoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    subcategoryInput = element(by.css('input#field_subcategory'));
    categorySelect = element(by.css('select#field_category'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setSubcategoryInput = function(subcategory) {
        this.subcategoryInput.sendKeys(subcategory);
    };

    getSubcategoryInput = function() {
        return this.subcategoryInput.getAttribute('value');
    };

    categorySelectLastOption = function() {
        this.categorySelect.all(by.tagName('option')).last().click();
    };

    categorySelectOption = function(option) {
        this.categorySelect.sendKeys(option);
    };

    getCategorySelect = function() {
        return this.categorySelect;
    };

    getCategorySelectedOption = function() {
        return this.categorySelect.element(by.css('option:checked')).getText();
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
