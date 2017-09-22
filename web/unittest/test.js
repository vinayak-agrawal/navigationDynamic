QUnit.test("Checking if content appended", function (assert) {
    var done = assert.async();
    setTimeout(function() {
        var navElem = document.getElementsByTagName("nav")[0];
        assert.equal( navElem.childNodes.length, 1 );
        done();
    });
});

QUnit.test("Checking change of title", function (assert) {
    var done = assert.async();
    setTimeout(function() {
        var list = document.getElementsByClassName('subsubcategory-level')[0];
        var liElem = ( list.getElementsByTagName('li')[0] ).getElementsByTagName('span')[0];
        var elemVal = liElem.innerText;
        liElem.click();

        var pageTitle = document.title;
        assert.equal(pageTitle, elemVal);
        done();
    });
});

QUnit.test("Checking change of content", function (assert) {
    var done = assert.async();
    setTimeout(function() {
        var list = document.getElementsByClassName('subsubcategory-level')[0];
        var liElem = ( list.getElementsByTagName('li')[0] ).getElementsByTagName('span')[0];
        var elemLink = '.'+liElem.getAttribute('data-link');
        liElem.setAttribute("data-link", elemLink);
        liElem.click();

        var xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var newData = document.getElementById('content').innerHTML;
                assert.equal(newData, xmlHttpReq.responseText)
                done();
            }    
        }
        xmlHttpReq.open('GET', elemLink, true);
        xmlHttpReq.send();
    });
});