/* function waitfunction() {
                    var a = 5000 + new Date().getTime();
                    while (new Date() < a){}
                    console.log('waitfunction() context will be popped after this line');
                }

                function clickHandler() {
                    console.log('click event handler...');   
                }

                document.addEventListener('click', clickHandler);


                waitfunction(); //a new context for this function is created and placed on the execution stack
                console.log('global context will be popped after this line');
                    */
