import Vue from 'vue';


Vue.filter('mimeIcon', (mime) => {
    if (!mime) {
        return 'question';
    }

    if (/^image\//.test(mime)) {
        return 'file-image-o';
    }

    if (mime === 'application/pdf') {
        return 'file-pdf-o';
    }

    return 'question';
});
