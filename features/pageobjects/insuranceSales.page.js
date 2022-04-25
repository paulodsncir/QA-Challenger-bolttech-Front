

import Page from './page';
import planValues from '../helper/planValues';


class InsuranceSales extends Page {

    get msgConfirmDevicePrice() {
        return $('>>>.container__confirm-price');
    }

    get priceDropdown() {
        return $('>>>span#selected')
    }

    get ProductNameCard() {
        return $('>>>p.card-title')
    }

    get dynamicPrice() {
        return $('>>>span#dynamicPrice');
    }

    get dynamicPriceTable() {
        return $('>>>table>tr>td>div>div[style="color:#222222;"]');
    }
    get planValue() {
        return $$('>>>#list > li')
    }

    get moreDetailLink() {
        return $('>>>a.fire-show-modal')
    }

    get dialogmodal() {
        return $('>>>div.edi-modal-dialog__body')
    }

    get modalContent() {
        return $('>>>div.image-container>img[alt="Modal image"]')
    }

    get btnClodeModal() {
        return $('>>>button.edi-modal-dialog__close')
    }
    get btnSelect() {
        return $('>>>a.edi-cta__button')
    }
    get checkoutPageTitle() {
        return $('>>>p.title')
    }

    get chekoutPageOriginalPrice() {
        return $('>>>p.original-price')
    }

    get chakoutPageProductName() {
        return $('>>>div.panel-content>p.title')
    }

    get chekoutPagefinalPrice() {
        return $('>>>p.final-price')
    }
    get chekoutPageProvider() {
        return $('>>>span#providerName')
    }

    get chekoutPageContractStarDate() {
        return $('>>>span#subscriptionStartDate')
    }

    get chekoutPageContractRenew() {
        return $('>>>span#subscriptionRenewal')
    }

    get chekoutPageBillingStartDate() {
        return $('>>>span#billingStartDate')
    }

    
    async ChoosePlanValue(value) {
        if (value) {
            const planValue = planValues.findIndex((i) => i.valor.includes(value.toString()))
            console.log('planValue', planValue)
            if (planValue === -1) {
                const random = Math.floor(Math.random() * 6)
                browser.config.selectedPlanValue = random
                await this.planValue[random].waitForDisplayed()
                await this.planValue[random].click()
                return
            }
            browser.config.selectedPlanValue = planValue
            await this.planValue[planValue].waitForDisplayed()
            await this.planValue[planValue].click()
        } else {
            const random = Math.floor(Math.random() * 6)
            browser.config.selectedPlanValue = random
            await this.planValue[random].waitForDisplayed()
            await this.planValue[random].click()
        }
    }

    async getImageURLAndValidate() {
        browser.config.imageUrl = await this.modalContent.getAttribute('src')
        await browser.newWindow(browser.config.imageUrl)
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        const currentURL = await browser.getUrl()
        await expect(currentURL).toBe(browser.config.imageUrl)
        await browser.closeWindow()
        await browser.switchToWindow(handles[0])

    }


    open() {
        return super.open();
    }
}

export default new InsuranceSales();
