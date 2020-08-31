console.log("**script tag api test**")

const header = $('header.site-header').parent();

header.prepend('<div>header test</div>').css({ 'background-color': '#000', 'text-align': 'center' })