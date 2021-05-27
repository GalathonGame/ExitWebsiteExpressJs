const checked = document.getElementById('menu-inp')
const menu= document.getElementById("menuToggle")
const yo = document.querySelector('.yobro')


menu.addEventListener("click", async() => {
    
    if (checked.checked === true)
    {
        document.body.scroll ='disable'
        if (yo.classList.contains("hidden")&&yo.classList.contains("active"))
        {
            yo.classList.remove("hidden")
        }

        yo.classList.remove('hidden')
        
        
        setTimeout(function() {yo.classList.add('active')},5)
        if (yo.classList.contains("hidden")&&yo.classList.contains("active"))
        {
            yo.classList.remove("hidden")
        }
        console.log(checked.checked)

        document.body.style.overflowY = 'hidden'
    }
    else if (checked.checked===false)
    {
        
        document.body.style.overflowY = ''
        if (yo.classList.contains("hidden")&&yo.classList.contains("active"))
        {
            yo.classList.remove("active")
        }
        yo.classList.remove('active');

        yo.addEventListener('transitionend', function(e) {setTimeout(function(){yo.classList.add('hidden');}),50}, {capture:false, once: true, passive: false});
        console.log(checked.checked)
    }
})


function noscroll() {
    document.body.style.overflowY = 'hidden'
}


function scroll() {
    document.body.style.overflowY = ''
}