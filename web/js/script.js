window.onload = function () {
    /* setting up the connection link */
    var ws = new WebSocket("ws://localhost:8080/navigationSocket/navdata");
    ws.onmessage = function (event) {
        /* 
         * reading data and creating HTML
        */
        var data = event.data;
        var navElem = document.getElementsByTagName("nav")[0];
           
        var ulElem = document.createElement("ul");
        ulElem.classList = "category-level";
        data = JSON.parse(data);
        for( var i=0; i<data.length; i++ ) {
            var category = data[i].category;
            var liElem = document.createElement("li");
            var span = document.createElement("span");
            span.innerText = category;
            liElem.appendChild(span);
            
            /*
             * reading subcategory for the category
             */
            if (typeof data[i].subcategory !== "undefined") {
                var subUlElem = document.createElement("ul");
                subUlElem.classList = "subcategory-level";
                var subcats = data[i].subcategory;
                for ( var j=0; j<subcats.length; j++ ) {
                    var subLiElem = document.createElement("li");
                    var subSpan = document.createElement("span");
                    subSpan.innerText = subcats[j].sub;
                    subLiElem.appendChild(subSpan);
                    
                    /*
                    * reading subcategory for the sub-category
                    */
                    if (typeof subcats[j].subcategory !== "undefined") {
                        var subsubUlElem = document.createElement("ul");
                        subsubUlElem.classList = "subsubcategory-level";
                        var subsubcats = subcats[j].subcategory;
                        
                        for ( var k=0; k<subsubcats.length; k++ ) {
                            var subsubLiElem = document.createElement("li");
                            var subsubSpan = document.createElement("span");
                            subsubSpan.innerText = subsubcats[k].sub;
                            subsubSpan.setAttribute("data-link", subsubcats[k].link);
                            subsubLiElem.appendChild(subsubSpan);
                            
                            subsubUlElem.appendChild( subsubLiElem );
                        }
                        
                        subLiElem.appendChild( subsubUlElem );
                        
                    }

                    subUlElem.appendChild( subLiElem );
                }
                
                liElem.appendChild( subUlElem );
            }
            
            ulElem.appendChild( liElem );
        }
        
        navElem.appendChild( ulElem );
        
        /*
         * Binding event to the links
         */
        var subsubcatUl = document.getElementsByClassName('subsubcategory-level');

	for( var i=0; i<subsubcatUl.length; i++ ) {
            var subsubcatLi = subsubcatUl[i].getElementsByTagName('li');

            for( var j=0; j<subsubcatLi.length; j++ ) {
                subsubcatLi[j].addEventListener('click', function( e ) {
                    document.title = e.target.innerText;

                    var thisLink = e.target.attributes['data-link'].value;
                    var xmlHttpReq = new XMLHttpRequest();

                    xmlHttpReq.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            var container = document.getElementById("content");
                            container.innerHTML = xmlHttpReq.responseText;
                        }
                    }
                    xmlHttpReq.open('GET', thisLink, true);
                    xmlHttpReq.send();
                });
            }
	}
    };
};