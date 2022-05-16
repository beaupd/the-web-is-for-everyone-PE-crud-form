import { useFEATURES } from "./modules/features.mjs";
import { useEnhanced } from "./modules/enhances.mjs";

const { supportsFetch, supportsFlex, supportsEventListener } = useFEATURES();
const {
    addStyles,
    initLoader,
    setLoader,
    loaderMSG,
    fetchEntries,
    getEntries,
    enhanceDOM,
} = useEnhanced();

const delay = (ms) =>
    new Promise((res) =>
        setTimeout(() => {
            res("");
        }, ms)
    );

// if all functions are supported
if (supportsFetch() && supportsFlex() && supportsEventListener()) {
    console.log("%c Enhanced version is supported!", "color: green");
    // init loader
    initLoader();
    // start loading state
    setLoader(true);
    // loading styles
    loaderMSG("Loading styles");
    await delay(Math.random() * 1000);
    loaderMSG(await addStyles().catch((err) => err));
    await delay(Math.random() * 1000);
    // fetching entries
    loaderMSG("Fetching entries");
    await delay(Math.random() * 1000);
    loaderMSG(await fetchEntries());
    // enhance dom
    loaderMSG("Enhancing DOM");
    loaderMSG(await enhanceDOM());

    // fully loaded
    await delay(Math.random() * 1000);
    loaderMSG("Succesfully loaded...");
    await delay(Math.random() * 1000);
    setLoader(false);
} else {
    console.log("%c Enhanced version is not supported", "color: red");
}
