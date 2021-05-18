let windowWidth = window.innerWidth;
window.addEventListener('resize', function () {
    windowWidth = window.innerWidth;
})

let isDesktop;
windowWidth > 1199 ? isDesktop = true : isDesktop = false;

export { windowWidth, isDesktop }




