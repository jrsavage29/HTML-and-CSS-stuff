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
            var temp = String(hellos[i].textContent);
            var index = temp.slice( 13);
            index *= 2;
            //alert(index);
            hellos[i].textContent = "Hello Number " + index;
        }
    }

    else if(readin === "Goodbye" || readin === "goodbye")
    {
        for(var i = 0; i < goodbyes.length; i++)
        {
            var temp = String(goodbyes[i].textContent);
            var index = temp.slice( 15);
            index *= 2;
            //alert(index);
            goodbyes[i].textContent = "Goodbye Number " + index;
        }
    }
}


the_button.addEventListener('click', response);

