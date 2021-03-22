const the_button = document.getElementById("thebutton");
const hellos = document.getElementsByClassName("hello");
const goodbyes = document.getElementsByClassName("goodbye");

let response = function()
{
    let readin = prompt("Enter Hello or Goodbye.", "Hello");

    if(readin === "Hello" || readin === "hello")
    {
        for(var i = 0; i < hellos.length; i++)
        {
            hellos[i].classList.add("highlight");
        }

        for(var i = 0; i < goodbyes.length; i++)
        {

            goodbyes[i].classList.remove("highlight");
        }
    }

    else if(readin === "Goodbye" || readin === "goodbye")
    {
        for(var i = 0; i < hellos.length; i++)
        {
            hellos[i].classList.remove("highlight");
        }

        for(var i = 0; i < goodbyes.length; i++)
        {

            goodbyes[i].classList.add("highlight");
        }
    }
}


the_button.addEventListener('click', response);