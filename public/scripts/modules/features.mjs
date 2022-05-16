export const useFEATURES = () => {
    const supportsFeature = (feature) => {
        return window[feature] ? true : false;
    };

    const supportsFetch = () => {
        return supportsFeature("fetch");
    };

    const supportsFlex = () => {
        let elem = document.createElement("div");
        return (
            elem.style.flex !== undefined && elem.style.flexFlow !== undefined
        );
    };

    const supportsEventListener = () => {
        let elem = document.createElement("div");
        return elem.addEventListener ? true : false;
    };

    return { supportsFetch, supportsFlex, supportsEventListener };
};
