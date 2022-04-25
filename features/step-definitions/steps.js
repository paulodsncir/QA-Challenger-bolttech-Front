import { Given, When, Then } from '@wdio/cucumber-framework';

import insuranceSales from '../pageobjects/insuranceSales.page';
import planValues from '../helper/planValues'
import { contracteStarDate, billingStartDate } from '../helper/dateThailandHelper'



Given(/^I am on the insurance sales page/, async () => {
    await insuranceSales.open()
    await insuranceSales.msgConfirmDevicePrice.waitForDisplayed()
    await insuranceSales.priceDropdown.waitForDisplayed()
    await insuranceSales.priceDropdown.click()

});

When(/^I choose a plan to be contracted with value "([^"]*)" fill in the information$/, async (planValue) => {
    await insuranceSales.ChoosePlanValue(planValue)
    browser.config.ProductName = await insuranceSales.ProductNameCard.getText()
    await expect(insuranceSales.priceDropdown).toHaveTextContaining(planValues[browser.config.selectedPlanValue].valor)
    await expect(insuranceSales.dynamicPrice).toHaveTextContaining(planValues[browser.config.selectedPlanValue].dynamicPrice)
    await expect(insuranceSales.dynamicPriceTable).toHaveTextContaining(planValues[browser.config.selectedPlanValue].dynamicPrice)
    await insuranceSales.moreDetailLink.click()
    await expect(insuranceSales.dialogmodal).toBeDisplayedInViewport()
    const modalContentTag = await insuranceSales.modalContent.getTagName()
    await expect(modalContentTag).toBe('img')
    await insuranceSales.getImageURLAndValidate()
    await insuranceSales.btnClodeModal.waitForDisplayed()
    await insuranceSales.btnClodeModal.click()
    const ModalIsVisible = await insuranceSales.dialogmodal.isDisplayedInViewport()
    await expect(ModalIsVisible).toBe(false)
    await insuranceSales.btnSelect.click()




});

Then(/^insurance will be taken out$/, async () => {

    browser.waitUntil(
        () => browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 60 * 1000

        }
    );
    await expect(insuranceSales.checkoutPageTitle).toBeDisplayedInViewport();
    await expect(insuranceSales.checkoutPageTitle).toHaveText('Screen Breakage');
    await expect(insuranceSales.chekoutPageOriginalPrice).toHaveTextContaining(planValues[browser.config.selectedPlanValue].dynamicPrice)
    await expect(insuranceSales.chekoutPagefinalPrice).toHaveTextContaining('฿0.00')
    await expect(insuranceSales.chekoutPageProvider).toHaveTextContaining('bolttech')
    await expect(insuranceSales.chekoutPageContractRenew).toHaveTextContaining('Monthly')
    await expect(await insuranceSales.chakoutPageProductName.getText()).toBe(browser.config.ProductName)
    await expect(await insuranceSales.chekoutPageContractStarDate.getText()).toBe(contracteStarDate())
    await expect(await insuranceSales.chekoutPageBillingStartDate.getText()).toBe(billingStartDate())
});

