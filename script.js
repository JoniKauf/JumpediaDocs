fetch("docs/index.md")
    .then(r => r.text())
    .then(md => {
        const reader = new commonmark.Parser();
        const writer = new commonmark.HtmlRenderer({
            safe: false
        });

        const parsed = reader.parse(md);
        document.getElementById("content").innerHTML = writer.render(parsed);
    });