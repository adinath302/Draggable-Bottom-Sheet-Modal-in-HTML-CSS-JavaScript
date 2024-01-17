const showmodalbtn = document.querySelector(".show-modal");
const bottomsheet = document.querySelector(".bottom-sheet");
const sheetoverlay = bottomsheet.querySelector(".sheet-overlay");
const sheetcontent = bottomsheet.querySelector(".content");
const dragicon = bottomsheet.querySelector(".drag-icon");

let isdragging = false, startY, startHeight;

const showbottomsheet = () => {
    bottomsheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updatesheetheight(50);
}
const hidebottomsheet = () => {
    bottomsheet.classList.remove("show");
    document.body.style.overflowY = "auto";
}
const updatesheetheight = (height) => {
    sheetcontent.style.height = `${height}vh`
    bottomsheet.classList.toggle("fullscreen", height === 100);
}
const dragestart = (e) => {
    isdragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetcontent.style.height);
    bottomsheet.classList.add("dragging");
}
const dragging = (e) => {
    if (!isdragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newheight = startHeight + delta / window.innerHeight * 100;
    updatesheetheight(newheight);
}
const dragstop = () => {
    isdragging = false;
    bottomsheet.classList.remove("dragging");
    const sheetheight = parseInt(sheetcontent.style.height);
    sheetheight < 25 ? hidebottomsheet() : sheetheight > 75 ? updatesheetheight(100) : updatesheetheight(50)
}
document.addEventListener("mouseup", dragstop)
dragicon.addEventListener("mousedown", dragestart)
document.addEventListener("mousemove", dragging)

document.addEventListener("touchend", dragstop)
dragicon.addEventListener("touchstart", dragestart)
document.addEventListener("touchmove", dragging)

showmodalbtn.addEventListener("click", showbottomsheet);
sheetoverlay.addEventListener("click", hidebottomsheet);
