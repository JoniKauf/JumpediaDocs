const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer({ safe: false });

/* -------------------- PAGE LOADING -------------------- */

function loadPage(page) {
    fetch(`docs/${page}.md`)
        .then(r => {
            if (!r.ok) throw new Error(`Page "${page}" not found`);
            return r.text();
        })
        .then(md => {
            document.getElementById("content").innerHTML =
                writer.render(reader.parse(md));

            setActive(page);
        })
        .catch(err => {
            document.getElementById("content").innerHTML = `
                <h1>404</h1>
                <p>${err.message}</p>
            `;
        });
}

/* -------------------- ROUTING -------------------- */

function getPage() {
    return location.hash.slice(1) || "index";
}

function route() {
    loadPage(getPage());
}

window.addEventListener("hashchange", route);

/* -------------------- SIDEBAR INTERACTION -------------------- */

function bindSidebar() {
    document.querySelectorAll("#sidebar [data-page]").forEach(el => {
        el.style.cursor = "pointer";

        el.addEventListener("click", () => {
            location.hash = el.dataset.page;
        });
    });
}

/* -------------------- NUMBERING (FIXED) -------------------- */

function numberSidebar() {
    const root = document.querySelector("#sidebar > ul");
    if (!root) return;

    function walk(ul, prefix = "") {
        let i = 0;

        [...ul.children].forEach(li => {
            const childUl = li.querySelector(":scope > ul");

            const number = prefix === ""
                ? String(i)
                : `${prefix}.${i + 1}`;

            const firstText = [...li.childNodes]
                .find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());

            if (firstText) {
                firstText.textContent =
                    `${number} ${firstText.textContent.trim()} `;
            } else {
                li.insertBefore(
                    document.createTextNode(`${number} `),
                    li.firstChild
                );
            }

            if (childUl) walk(childUl, number);

            i++;
        });
    }

    walk(root);
}

/* -------------------- ACTIVE STATE -------------------- */

function setActive(page) {
    document.querySelectorAll("#sidebar [data-page]").forEach(el => {
        el.classList.toggle("active", el.dataset.page === page);
    });
}

/* -------------------- INIT -------------------- */

numberSidebar();
bindSidebar();
route();