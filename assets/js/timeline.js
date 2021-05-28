var _tl_duration = 0
var _tl_current = 0
var _animation_timeline = null

function setTimeline(status){
    getE('situacion-controls').className = 'timeline-on'
    player.getDuration().then(function(duration) {
        _tl_duration = duration

        getE('bar-progress').style.width = '0%'

        if(status){
            getE('play-btn').setAttribute('status','playing')
            getE('play-btn').className = 'play-btn-pause'
        }else{
            getE('play-btn').setAttribute('status','paused')
            getE('play-btn').className = 'play-btn-play'
        }

        //pponer volumen al maximo
        var rayas = getE('volumen').getElementsByTagName('div')
        for(i = 0;i<rayas.length;i++){
            rayas[i].className = 'volumen-indicator-on'
        }
        player.setVolume(1).then(function() {
            
        })

        _animationTimeline()
    });
}

function unsetTimeline(){
    getE('situacion-controls').className = 'timeline-off'
    stopTimeline()
}

function stopTimeline(){
    clearInterval(_animation_timeline)
    _animation_timeline = null
}
function resumeTimeline(){
    _animationTimeline()
}

function _animationTimeline(){
    _animation_timeline = setInterval(function(){
        player.getCurrentTime().then(function(seconds) {
            _tl_current = seconds
            var percent = (_tl_current*100)/_tl_duration
            var _percent = Math.floor(percent*100)/100

            getE('bar-progress').style.width = _percent+'%'
        });
    },100)
}

function toggleVideoPlay(){
    var status = getE('play-btn').getAttribute('status')
    if(status=='paused'){
        player.play().then(function(){
            getE('play-btn').setAttribute('status','playing')
            getE('play-btn').className = 'play-btn-pause'
        })
    }else{
        player.pause().then(function(){
            getE('play-btn').setAttribute('status','paused')
            getE('play-btn').className = 'play-btn-play'
        })
    }
    
}

function clickVolumen(event){
    var posx = event.pageX
    var rect = getE('volumen').getBoundingClientRect()
    var distance = (posx-rect.left)
    var v = (distance*100)/rect.width

    var volume = (v/100)
    var tope = Math.round((v/10))
    player.setVolume(volume).then(function() {
        //cambiar rayitas
        var rayas = getE('volumen').getElementsByTagName('div')
        for(i = 0;i<tope;i++){
            rayas[i].className = 'volumen-indicator-on'
        }
        for(i = tope;i<rayas.length;i++){
            rayas[i].className = 'volumen-indicator-off'
        }
    })
}

function clickTimeline(event){
    var posx = event.pageX
    var rect = getE('bar').getBoundingClientRect()
    var distance = (posx-rect.left)
    var porcentaje = (distance*100)/rect.width
    var duracion = (porcentaje*_tl_duration)/100

    if(duracion>_tl_current){
        //quiere avanzar, nel
        //if(resumed){
            stopTimeline()
            getE('bar-progress').style.width = porcentaje+'%'
            player.setCurrentTime(duracion).then(function() {
                resumeTimeline()
            })
        //}
    }else{
        //quiere retroceder, ok
        stopTimeline()
        getE('bar-progress').style.width = porcentaje+'%'
        player.setCurrentTime(duracion).then(function() {
            resumeTimeline()
        })
    }
}