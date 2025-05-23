// Example of MutationObserver
const targetNode = document.body; // or any specific part of the YouTube DOM
const config = { childList: true, subtree: true };

let styles = "";

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // Reapply your custom changes here
        // TODO: This happens a lot
        // console.log("DOM changed, reapplying custom styles");
        applyCustomChanges();
    });
});

observer.observe(targetNode, config);

function applyCustomChanges() {
    if (container != undefined) {
        let contents = []
        for (let i = 0; i < container.children.length; i++) {
            if (container.children[i].nodeType != 'div') {
                contents.push(container.children[i])
            } else {
                container.children[i].remove()
            }
        }
        if (previousLen != contents.length) {
            stylize(contents)
            styles = `
                #contents h1 {
                    width: 100%;
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 30px;
                    color: ${textColour};
                }
                `
            replaceAll(container)
            previousLen = contents.length
        }
        checks += 1;
    } else {
        container = document.getElementById("contents")
    }
    if (checks == 11) {
        // clearInterval(loadInterval)
    }
}



let defaultElms = []
let ytElms = []
let customElms = []
let textColour = "";
function stylize(contents) {
    for (let i = 0; i < contents.length; i++) {
        let h3 = contents[i].querySelector("h3")
        if (h3 != undefined) {
            if (defaultElms.includes(contents[i]) || ytElms.includes(contents[i]) || customElms.includes(contents[i])) {
                continue;
            }

            if (h3.innerHTML.includes("Mix – ")) {
                ytElms.push(contents[i])
            } else if (h3.innerHTML.includes("Liked videos") || h3.innerHTML.includes("Watch Later")) {
                if (textColour == "") {
                    let a = h3.getElementsByTagName("a")[0].getElementsByTagName("span")[0];
                    textColour = window.getComputedStyle(a)["color"];
                }
                defaultElms.push(contents[i])
            } else {
                customElms.push(contents[i])
            }
        }
        contents[i].remove()
    }
}

function replaceAll(container) {
    let styleSheet = document.createElement("style")
    styleSheet.textContent = styles
    document.head.appendChild(styleSheet)

    let h1_3 = document.createElement("h1")
    h1_3.innerHTML = "Default Playlists"
    container.appendChild(h1_3)
    defaultElms.forEach(e => {
        e.style.marginTop = "0px";
        e.style.marginLeft = "8px";
        e.style.marginRight = "8px";
        e.style.marginBottom = "40px";
        container.appendChild(e)
    })
    defaultElms = [];

    let h1_1 = document.createElement("h1")
    h1_1.innerHTML = "Custom Playlists"
    container.appendChild(h1_1)
    customElms.forEach(e => {
        e.style.marginTop = "0px";
        e.style.marginLeft = "8px";
        e.style.marginRight = "8px";
        e.style.marginBottom = "40px";
        container.appendChild(e)
    })
    customElms = [];

    let h1_2 = document.createElement("h1")
    h1_2.innerHTML = "Youtube Playlists"
    container.appendChild(h1_2)
    ytElms.forEach(e => {
        e.style.marginTop = "0px";
        e.style.marginLeft = "8px";
        e.style.marginRight = "8px";
        e.style.marginBottom = "40px";
        container.appendChild(e)
    })
    ytElms = [];
}

let checks = 0
let previousLen = 0
let container = undefined