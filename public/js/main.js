$(function () {
    let isEdited = false;
    let adjustScreen = () => {
        let screenHeight = $(window).height();
        let headerHeight = $('#header').outerHeight();
        let footerHeight = $('#footer').outerHeight();
        let containerHeight = screenHeight - headerHeight - footerHeight;
        $('#container').css({top: `${headerHeight}px`});
        $('.column').css({height: `${containerHeight}px`});
    };

    $(window).resize(() => {
        adjustScreen();
    });
    let editor = ace.edit('editor');
    editor.getSession().setUseWrapMode(true);
    editor.renderer.setScrollMargin(10, 10, 10, 10);
    editor.setOptions({
        maxLines: Infinity,
        indentedSoftWrap: false,
        fontSize: 14,
        theme: 'ace/theme/dracula',
    });

    editor.on('change', () => {
        isEdited = true;
        convert();
        adjustScreen();
    });

    let convert = () => {
        let raw = editor.getValue();
        let html = convertUnityRichTextToHtml(raw);
        $('#output').html(html);
    }

    $(window).bind('beforeunload', function () {
        if (isEdited) {
            return 'Are you sure you want to leave? Your changes will be lost.';
        }
    });
    convert();
    adjustScreen();

    setTimeout(() => {
        adjustScreen();
        editor.focus();
    }, 100);

});
