function convertUnityRichTextToHtml(input) {
    input = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // input = input.replace(/\n/g, '<br>');
    // Replace opening and closing color tags with corresponding span tags
    let html = input.replace(/&lt;color=(\w+)&gt;/g, '<span style="color: $1">')
        .replace(/&lt;\/color&gt;/g, '</span>');

    // Replace opening and closing hex color tags with corresponding span tags
    html = html.replace(/&lt;color=([#A-Fa-f0-9]+)&gt;/g, '<span style="color: $1">')
        .replace(/&lt;\/color&gt;/g, '</span>');

    // Replace other Unity tags with corresponding HTML tags
    html = html.replace(/&lt;b&gt;/g, '<strong>')
        .replace(/&lt;\/b&gt;/g, '</strong>')
        .replace(/&lt;i&gt;/g, '<em>')
        .replace(/&lt;\/i&gt;/g, '</em>')
        .replace(/&lt;u&gt;/g, '<u>')
        .replace(/&lt;\/u&gt;/g, '</u>')
        .replace(/&lt;s&gt;/g, '<del>')
        .replace(/&lt;\/s&gt;/g, '</del>');

    html = html.replace(/&lt;link=(.*?)&gt;/g, function (match, p1) {
        return '<a href="' + p1 + '">';
    }).replace(/&lt;\/link&gt;/g, '</a>');


    html = html.replace(/&lt;size=(.*?)&gt;/g, function (match, p1) {
        let size = p1;
        const fontSize = getComputedStyle(document.documentElement).getPropertyValue('--font-size');
        if (size.endsWith('%')) {
            size = size.replace('%', '');
            size = size / 100;
            size = size * fontSize;
        }
        return '<span style="font-size: ' + size + 'px;">';
    }).replace(/&lt;\/size&gt;/g, '</span>');
    return html;
}
