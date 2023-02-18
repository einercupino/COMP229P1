// IIFE -- Immediately Invoked Function Expression
//Einer Cupino - 301233614 - COMP229 Section 004 - Feb 3, 2022
(function(){

    function Start() 
    {
        console.log("App started..");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        for(button of deleteButtons) 
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/user-list');
                }
            });
        }
    }

    window.addEventListener("load",Start);

})();