document.getElementById('view-json').addEventListener('click', function() {
    const jsonInput = document.getElementById('json-input').value;
    try {
        const jsonObject = JSON.parse(jsonInput);
        document.getElementById('json-output').innerHTML = renderJSON(jsonObject);
        addToggleListeners();
    } catch (error) {
        document.getElementById('json-output').textContent = 'Invalid JSON: ' + error.message;
    }
});

function renderJSON(jsonObject, isNested = false) {
    let html = '';
    if (typeof jsonObject === 'object' && jsonObject !== null) {
        html += '<ul>';
        for (const key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                html += '<li>';
                if (typeof jsonObject[key] === 'object' && jsonObject[key] !== null) {
                    html += `<span class="json-toggle">[+]</span> <span class="json-key">"${key}":</span> ${renderJSON(jsonObject[key], true)}`;
                } else {
                    html += `<span class="json-key">"${key}":</span> <span class="json-value">${formatValue(jsonObject[key])}</span>`;
                }
                html += '</li>';
            }
        }
        html += '</ul>';
    } else {
        html += `<span class="json-value">${formatValue(jsonObject)}</span>`;
    }
    return html;
}

function formatValue(value) {
    if (typeof value === 'string') {
        return `<span class="json-string">"${value}"</span>`;
    } else {
        return value;
    }
}

function addToggleListeners() {
    document.querySelectorAll('.json-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const ul = this.nextElementSibling.nextElementSibling;
            if (ul.style.display === 'none') {
                ul.style.display = 'block';
                this.textContent = '[-]';
            } else {
                ul.style.display = 'none';
                this.textContent = '[+]';
            }
        });
    });
}

