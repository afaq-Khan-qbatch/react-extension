console.log('in fb market place');

chrome.storage.local.get(['productData'], ({ productData }) => {
    console.log(productData);
    const setNativeValue = (element, value) => {
        console.log(element, value);
        let lastValue = element.value;
        element.value = value;
        let event = new Event("input", { target: element, bubbles: true });
        event.simulated = true;
        let tracker = element._valueTracker;
        if (tracker) {
            console.log('in if');
            tracker.setValue(lastValue);
        }
        element.dispatchEvent(event);
    }

    const setValues = () => {
        const price = document.querySelectorAll('input[class="oajrlxb2 rq0escxv f1sip0of hidtqoto e70eycc3 lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id qc3s4z1d knj5qynh fo6rh5oj osnr6wyh hv4rvrfc dati1w0a p0x8y401 k4urcfbm iu8raji3 nfbje2wv"]')[1];
        console.log(price);
        setNativeValue(price, productData.price);

        const title = document.querySelectorAll('input[class="oajrlxb2 rq0escxv f1sip0of hidtqoto e70eycc3 lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id qc3s4z1d knj5qynh fo6rh5oj osnr6wyh hv4rvrfc dati1w0a p0x8y401 k4urcfbm iu8raji3 nfbje2wv"]')[0];
        setNativeValue(title, productData.title);

        const description = document.querySelector('textarea[class="oajrlxb2 rq0escxv f1sip0of hidtqoto lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id j83agx80 jagab5yi knj5qynh fo6rh5oj oud54xpy l9qdfxac ni8dbmo4 stjgntxs hv4rvrfc dati1w0a ieid39z1 k4urcfbm"]');
        setNativeValue(description, 'this area is for description..');

        const tags = document.querySelector('textarea[class="oajrlxb2 rq0escxv f1sip0of hidtqoto lzcic4wl g5ia77u1 gcieejh5 bn081pho humdl8nn izx4hr6d oo9gr5id j83agx80 jagab5yi knj5qynh fo6rh5oj ni8dbmo4 stjgntxs sj5x9vvc ieid39z1 k4urcfbm"]');
        setNativeValue(tags, 'afaq khan');

        if(tags && title && price && description) clearInterval(ValueInterval);
    }

    const ValueInterval = setInterval(setValues, 1000);
})