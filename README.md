# Beyond Use Date Calculator



__The page currently sits at 3.7KB after minification + gzipping__

##What we did to squeeze our website into as few kibbles as possible:
- HTML/CSS/JavaScript minification
- As much JavaScript encapsulation as possible to get maximum minification.
- Minimal class/variable names
- Gzipping

##Installation
- Run `npm install` to install dependencies
- Run `node app.js` to run the server

##Compilation:
Run `make`, which will run our ruby script to generate index.html (minified), and index.html.gz (minified + gzipped)

###Ruby gems used:
- [HTML Press](https://github.com/stereobooster/html_press)
- [CSS Minify](https://github.com/matthiassiegel/cssminify)
- [Uglifier](https://github.com/lautis/uglifier)

_
