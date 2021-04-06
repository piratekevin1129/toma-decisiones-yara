window.onresize = function(){
    if(window.innerWidth>845){
        var ancho = window.innerWidth
        var alto = window.innerHeight

        var scale = (ancho/845)
        var new_alto = (508*scale)

        while(new_alto>alto){
            ancho-=10
            scale = (ancho/845)
            new_alto = (508*scale)
        }
        var scal = Math.floor(scale*100)/100

        document.body.style.transform = 'scale('+scal+')'
        document.body.style.mozTransform = 'scale('+scal+')'
        document.body.style.webkitTransform = 'scale('+scal+')'
        document.body.style.oTransform = 'scale('+scal+')'
        console.log(scal)
    }else{
        document.body.removeAttribute("style")
    }
}