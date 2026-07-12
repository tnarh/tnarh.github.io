const ARTICLE = document.getElementById("article");

let IDS = [];
let nextId = 1;
let selectedElement = null;

ARTICLE.addEventListener("focusin", (e) => {
    selectedElement = e.target;
});

function cmd(what) {
    if (what === "delete") {
        if (!selectedElement) {
            alert("No item selected.");
            return;
        }

        IDS = IDS.filter(id => id !== selectedElement.id);

        selectedElement.remove();

        selectedElement = null;

        console.log(IDS);
    }

    else if (what === "export") {
        let exported = "";

        for (let i = 0; i < IDS.length; ++i) {
            let ID = IDS[i];
            let TYPE = ID.split("_")[1];
            let content = document.getElementById(ID);

            if (TYPE == "info") {
                exported += `Template___Infobox\n`;
                exported += content.value;
                exported += `\nDonetemplate`;
            }

            else if (TYPE == "h1") {
                exported += `# ${content.value}`;
            }
            else if (TYPE == "h2") {
                exported += `## ${content.value}`;
            }
            else if (TYPE == "h3") {
                exported += `### ${content.value}`;
            }

            else if (TYPE == "text") {
                exported += content.value;
            }

            else if (TYPE == "img") {
                exported += `Template___Image\n`;
                exported += content.value;
                exported += `\nAlt text not available.\nDonetemplate`;
            }

            else if (TYPE == "quote") {
                exported += `> ${content.value}`;
            }

            exported += "\n";
        }

        console.log(exported);
        navigator.clipboard.writeText(exported);

        alert("Copied to clipboard. Send me your article and any images if you have included them")
    }
}

function add(what) {

    let element;

    switch (what) {

        case "p":
            element = document.createElement("textarea");
            element.id = `item_text_${nextId++}`;
            element.className = "textarea";
            element.placeholder = "Write some text...";
            break;

        case "infobox":
            element = document.createElement("textarea");
            element.id = `item_info_${nextId++}`;
            element.className = "textarea";
            element.placeholder = "Write some information...";
            element.style.border = "1px solid red";
            element.value =
`title = 
image = 
full_name = 
aka = 
born = 
country = 
known_for = `;
            break;

        case "h1":
            element = document.createElement("input");
            element.id = `item_h1_${nextId++}`;
            element.className = "h1";
            element.placeholder = "Write a Heading1...";
            element.style.border = "1px solid blue";
            break;

        case "h2":
            element = document.createElement("input");
            element.id = `item_h2_${nextId++}`;
            element.className = "h2";
            element.placeholder = "Write a Heading2...";
            element.style.border = "1px solid blue";
            break;

        case "h3":
            element = document.createElement("input");
            element.id = `item_h3_${nextId++}`;
            element.className = "h3";
            element.placeholder = "Write a Heading3...";
            element.style.border = "1px solid blue";
            break;

        case "image":
            element = document.createElement("input");
            element.id = `item_img_${nextId++}`;
            element.className = "img";
            element.placeholder = "Write the file name of an image. Don't forget to send me the image too";
            break;

        case "quote":
            element = document.createElement("input");
            element.id = `item_quote_${nextId++}`;
            element.className = "quote";
            element.placeholder = "Write a quote...";
            element.style.border = "1px solid yellow";
            break;

        default:
            return;
    }

    IDS.push(element.id);
    ARTICLE.appendChild(element);

    // Automatically focus the new element
    element.focus();

    console.log(IDS);
}

function turn(style) {
    if (!selectedElement) {
        alert("No item selected.");
        return;
    }

    // Only works on inputs/textareas
    if (
        selectedElement.tagName !== "TEXTAREA" &&
        selectedElement.tagName !== "INPUT"
    ) {
        return;
    }

    const start = selectedElement.selectionStart;
    const end = selectedElement.selectionEnd;

    if (start === end) return; // nothing selected

    const value = selectedElement.value;
    const selected = value.slice(start, end);

    let marker;

    switch (style) {
        case "bold":
            marker = "**";
            break;

        case "italic":
            marker = "*";
            break;

        default:
            return;
    }

    // Toggle
    const before = value.slice(start - marker.length, start);
    const after = value.slice(end, end + marker.length);

    if (before === marker && after === marker) {
        // Remove formatting
        selectedElement.value =
            value.slice(0, start - marker.length) +
            selected +
            value.slice(end + marker.length);

        selectedElement.focus();
        selectedElement.setSelectionRange(
            start - marker.length,
            end - marker.length
        );
    } else {
        // Add formatting
        selectedElement.value =
            value.slice(0, start) +
            marker +
            selected +
            marker +
            value.slice(end);

        selectedElement.focus();
        selectedElement.setSelectionRange(
            start + marker.length,
            end + marker.length
        );
    }
}
