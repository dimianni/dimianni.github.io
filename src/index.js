import { appInit } from './main';
import FontFaceObserver from "fontfaceobserver";
import imagesLoaded from "imagesLoaded";
import './scss/style.scss';


import './images/kurtyak.png'
import './images/kurtyak.webp'

import './images/butterfly3.png'
import './images/butterfly3.webp'

import './images/outspoken-pf.jpg'
import './images/outspoken-pf.webp'

import './images/SpherePNG.png'
import './images/SpherePNG.webp'

import './images/duome_1.png'
import './images/duome_2.png'
import './images/duome_3.png'
import './images/duome_4.png'
import './images/duome_5.png'
import './images/duome_6.png'
import './images/duome_7.png'

import './images/duome_facts1.png'
import './images/duome_facts2.png'
import './images/duome_facts3.png'
import './images/duome_facts4.png'

import './images/tlv.svg'
import './images/keepon.svg'
import './images/icons8-javascript.svg'
import './images/icons8-jquery.svg'
import './images/icons8-gulp.svg'
import './images/icons8-npm.svg'
import './images/icons8-php-logo.svg'
import './images/icons8-react.svg'
import './images/icons8-sass.svg'
import './images/icons8-drupal.svg'
import './images/icons8-wordpress-simple.svg'
import './images/icons8-opencart.svg'

/*----------------------------------------------------------------------*/
/* Preload fonts and images
------------------------------------------------------------------------*/

const fontMontserrat = new FontFaceObserver("Montserrat").load()

// Preload images
let IMAGES;
const preloadImages = new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll("img"), { background: true }, resolve);
}).then(images => {
    IMAGES = images.images;
});

const preloadEverything = [fontMontserrat, preloadImages];

/*----------------------------------------------------------------------*/
/* Then:
------------------------------------------------------------------------*/
Promise.all(preloadEverything).then(() => {
    // Remove the loader
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");

    // Start the app
    appInit();
});








