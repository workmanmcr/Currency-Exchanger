const Utils = {
    validateAmount(input) {
        const amount = Number(input.value);
        if (!amount) input.style.borderColor = "#de3f44";
        else input.style.borderColor = "#c6c7c9";
    },
};

export default Utils;
