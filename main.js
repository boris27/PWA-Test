function a( domElem ) {
    let ul = 'ul';
    let ol = 'ol';
   console.dir(domElem.querySelectorAll('ul'));


}
function isContainsChildren(elem) {

    return (elem.getElementsByTagName('ul').length || elem.getElementsByTagName('ol').length)

}

a(document.getElementsByTagName('body')[0]);