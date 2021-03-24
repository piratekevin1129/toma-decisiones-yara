var toggle_audio = true
var toggle_audio_volume = 1
function toggleAudio(){
    if(toggle_audio){
        toggle_audio = false
        toggle_audio_volume = 0
        getE('sonido-btn').className = 'sonido-off'
    }else{
        toggle_audio = true
        toggle_audio_volume = 1
        getE('sonido-btn').className = 'sonido-on'
    }
    underground_mp3.volume = toggle_audio_volume
}
function repeatUnderground(){
    underground_mp3.volume = toggle_audio_volume
    underground_mp3.play()
}
var underground_mp3 = getE('underground_mp3')
underground_mp3.volume = toggle_audio_volume

function getE(idname){
    return document.getElementById(idname)
}

function startGame(){
    getE('welcomepage').classList.add('welcomepage-gone')
    animacion_welcome = setTimeout(function(){
        clearTimeout(animacion_welcome)
        animacion_welcome = null
        getE('welcomepage').style.display = 'none'
    },500)

    setGame()
}

function setGame(){
    setPregunta()
}

var audio_pregunta = getE('audio_pregunta')
var audio_retro_bien = getE('audio_retro_bien')
var audio_retro_mal = getE('audio_retro_mal')
var animacion_opcion = null
var animacion_situacion = null
var opciones = [
    getE('opcion1'),
    getE('opcion2'),
    getE('opcion3')
]
var resultados = 0
var actual_pregunta = 0
var actual_pregunta_data = null
var iframe = document.querySelector('#situacion-iframe');
var player = null

var animacion_escenario = null
var animacion_situacion = null

function displayPlayer(p){
    getE('situacion-frame-'+(p+1)).classList.remove('situacion-frame-off')
    getE('situacion-frame-'+(p+1)).classList.add('situacion-frame-on')
    
    //console.log(players)
    player = players[p]
    
    //console.log(p)
    //console.log(player)
}

function setPregunta(){
    if(actual_pregunta==preguntas_data.length){
    //if(actual_pregunta==1){
        var h = ''
        var src = 0
        if(resultados==9||resultados==10){
            getE('resultado-texto').innerHTML = resultados_data[0].texto
            getE('resultado-intro').innerHTML = resultados_data[0].intro
            for(i = 0;i<resultados_data[0].misiones.length;i++){
                h+='<li>'+resultados_data[0].misiones[i]+'</li>'
            }
            getE('resultado-lista').innerHTML = h
            src = 1
        }else if(resultados==8||resultados==7){
            getE('resultado-texto').innerHTML = resultados_data[1].texto
            getE('resultado-intro').innerHTML = resultados_data[1].intro
            for(i = 0;i<resultados_data[1].misiones.length;i++){
                h+='<li>'+resultados_data[1].misiones[i]+'</li>'
            }
            getE('resultado-lista').innerHTML = h
            src = 2
        }else{
            getE('resultado-texto').innerHTML = resultados_data[2].texto
            getE('resultado-intro').innerHTML = resultados_data[2].intro
            for(i = 0;i<resultados_data[2].misiones.length;i++){
                h+='<li>'+resultados_data[2].misiones[i]+'</li>'
            }
            getE('resultado-lista').innerHTML = h
            src = 3
        }

        audio_final.onloadedmetadata = null
        audio_final.src = 'assets/media/final'+src+'.mp3'
        audio_final.load()
        audio_final.onloadedmetadata = function(){
            audio_final.onloadedmetadata = null
            audio_final.currentTime = 0
            audio_final.play()
        }
        toggle_audio_volume = 0.3
        underground_mp3.volume = toggle_audio_volume
        
        getE('pregunta-app').className = 'pregunta-off'
        getE('escenario').className = 'escenario-on'
        getE('header').className = 'header-off'
        animacion_escenario = setTimeout(function(){
            clearTimeout(animacion_escenario)
            animacion_escenario = null

            getE('resultado-box').className = 'resultado-on'
            in_option.currentTime = 0
            in_option.play()
        },100)

        spdPlayMovieclip({frame:1,stop:0,loop:true},0)
        respuestas_usuario.completado = true
        saveScorm(true)
    }else{
        actual_pregunta_data = preguntas_data[actual_pregunta]
        getE('pregunta-txt').innerHTML = actual_pregunta_data.pregunta
        getE('opcion1-txt').innerHTML = actual_pregunta_data.opcion1
        getE('opcion2-txt').innerHTML = actual_pregunta_data.opcion2
        getE('opcion3-txt').innerHTML = actual_pregunta_data.opcion3

        getE('opcion1').className = 'opcion1-'+actual_pregunta_data.size+' opcion-cont opcion1_init'
        getE('opcion2').className = 'opcion2-'+actual_pregunta_data.size+' opcion-cont opcion2_init'
        getE('opcion3').className = 'opcion3-'+actual_pregunta_data.size+' opcion-cont opcion3_init'

        getE('zona1').className = 'zona zona-'+actual_pregunta_data.size
        getE('zona2').className = 'zona zona-'+actual_pregunta_data.size
        getE('zona3').className = 'zona zona-'+actual_pregunta_data.size

        var icon1 = getE('opcion1').getElementsByClassName('result-icon')[0]
        var icon2 = getE('opcion2').getElementsByClassName('result-icon')[0]
        var icon3 = getE('opcion3').getElementsByClassName('result-icon')[0]
        icon1.className = 'result-icon icon-off'
        icon2.className = 'result-icon icon-off'
        icon3.className = 'result-icon icon-off'
    
        //getE('situacion-video').src = 'assets/media/videos/'+actual_pregunta_data.id+'.mp4'
        //getE('situacion-video').addEventListener('loadedmetadata', loadedVideo, true);

        //getE('loader').className = 'loader-on'
        //getE('loader-text').innerHTML = 'Cargando video'
        //spdPlayAnimation({frame:1,stop:0,loop:true},0)
        getE('header').className = 'header-off'

        if(player!=null){
            players[actual_pregunta-1].destroy().then(function() {
                players[actual_pregunta-1] = null
                getE('situacion-frame-'+actual_pregunta).classList.remove('situacion-frame-on')
                getE('situacion-frame-'+actual_pregunta).classList.add('situacion-frame-off')

                displayPlayer(actual_pregunta)
                
                getE('situacion').className = 'situacion-on'
                getE('situaciones-mask').className = 'situaciones-mask-on'
                getE('pregunta-app').className = 'pregunta-off'
                underground_mp3.pause()
    
                loadedVideo()
                
            })
        }else{
            displayPlayer(actual_pregunta)
            
            getE('situacion').className = 'situacion-on'
            getE('situaciones-mask').className = 'situaciones-mask-on'
            getE('pregunta-app').className = 'pregunta-off'
            getE('caso-txt').innerHTML = 'Caso '+(actual_pregunta+1)
            underground_mp3.pause()

            loadedVideo()
        }
    }
}

function loadedVideo(){
    //getE('situacion-video').removeEventListener('loadedmetadata', loadedVideo, true);
    player.on('ended', endVideo)
    //getE('situacion-video').addEventListener('ended', endVideo, true)

    player.play().then(function() {
        //getE('situacion-video').play()
        getE('situaciones-mask').className = 'situaciones-mask-off'
        setTimeline(true)
    })
}

function endVideo(data){
	unsetTimeline()
	//getE('situacion-video').removeEventListener('ended', endVideo, true)

    if(!resumed){

        getE('situacion').className = 'situacion-off'
        getE('pregunta-app').className = 'pregunta-on'
        animacion_situacion = setTimeout(function(){
            clearTimeout(animacion_situacion)
            animacion_situacion = null
    
            audio_pregunta.onloadedmetadata = null
            audio_pregunta.src = 'assets/media/audios/pregunta-'+(actual_pregunta+1)+'.mp3'
            audio_pregunta.load()
            audio_pregunta.onloadedmetadata = function(){
                audio_pregunta.onloadedmetadata = null
                audio_pregunta.currentTime = 0
                audio_pregunta.play()
            }
            underground_mp3.play()
            
            getE('caso-txt').innerHTML = 'Caso '+(actual_pregunta+1)
            getE('header').className = 'header-on'
            var o = 0
            getE('pregunta-cont').classList.remove('pregunta-init')
            getE('pregunta-cont').classList.add('pregunta-in')
            in_option.currentTime = 0
            in_option.play()
            
            animacion_opcion = setInterval(function(){
                if(o==opciones.length){
                    clearInterval(animacion_opcion)
                    animacion_opcion = null
        
                    for(o = 0;o<opciones.length;o++){
                        //var zona = opciones[o].getElementsByClassName('opcion-zona')[0]
                        //opciones[o].setAttribute('onmouseover','overOpcion(this,'+(o+1)+')')
                        //opciones[o].setAttribute('onmouseout','outOpcion(this,'+(o+1)+')')
                        opciones[o].setAttribute('onclick','clickOpcion('+(o+1)+')')
                    }
                    getE('zonas').className = 'zonas-on'
                    getE('video-btn').className = 'video-btn-enabled'
                }else{
                    var opcion_sound = new Audio('assets/media/in-option.mp3')
                    opcion_sound.play()
                    opciones[o].classList.remove('opcion'+(o+1)+'_init')
                    opciones[o].classList.add('opcion'+(o+1)+'_in')
                    o++
                }
            },300)
        },1000)

    }else{
        resumed = false
        getE('situacion').className = 'situacion-off'
        getE('pregunta-app').className = 'pregunta-on'
        animacion_situacion = setTimeout(function(){
            clearTimeout(animacion_situacion)
            animacion_situacion = null
        
            audio_pregunta.currentTime = 0
            audio_pregunta.play()
            
            underground_mp3.play()
            
            getE('header').className = 'header-on'
        },1000)
    }
}

function overOpcion(key){
    //var op = zn.parentNode
    var op = getE('opcion'+key)
    over_option.currentTime = 0
    over_option.play()
    op.className = 'opcion'+key+'-'+actual_pregunta_data.size+' opcion-cont opcion'+key+'_over'
}

function outOpcion(key){
    //var op = zn.parentNode
    var op = getE('opcion'+key)
    op.className = 'opcion'+key+'-'+actual_pregunta_data.size+' opcion-cont opcion'+key+'_out'
}

function clickOpcion(key){
    var zn = getE('opcion'+key)
    var icon = zn.getElementsByClassName('result-icon')[0]

    click_mp3.currentTime = 0
    click_mp3.play()
    audio_pregunta.pause()
    audio_pregunta.loadedmetadata = null
    getE('video-btn').className = 'video-btn-disabled'

    if(key==actual_pregunta_data.correcto){
        respuestas_usuario.respuestas[actual_pregunta].resultado = 'correcto'
        icon.className = 'result-icon correct-icon icon-on'
        resultados++
        getE('retroalimentacion-title').innerHTML = actual_pregunta_data.bien.title
        var obj = ''
        for(i = 0;i<actual_pregunta_data.bien.objetivos.length;i++){
            obj+='<li>• '+actual_pregunta_data.bien.objetivos[i]+'</li>'
        }
        getE('retroalimentacion-msg').style.display = 'none'
        getE('retroaliementacion-list').style.display = 'initial'
        getE('retroaliementacion-list').innerHTML = obj

        audio_retro_bien.onloadedmetadata = null
        audio_retro_bien.src = 'assets/media/audios/bien-'+(actual_pregunta+1)+'.mp3'
        audio_retro_bien.load()
        audio_retro_bien.onloadedmetadata = function(){
            audio_retro_bien.onloadedmetadata = null
            audio_retro_bien.currentTime = 0
            audio_retro_bien.play()
        }
    }else{
        respuestas_usuario.respuestas[actual_pregunta].resultado = 'incorrecto'
        icon.className = 'result-icon incorrect-icon icon-on'
        getE('retroalimentacion-title').innerHTML = actual_pregunta_data.mal.title
        getE('retroalimentacion-msg').style.display = 'initial'
        getE('retroaliementacion-list').style.display = 'none'
        getE('retroalimentacion-msg').innerHTML = actual_pregunta_data.mal.msg

        audio_retro_mal.onloadedmetadata = null
        audio_retro_mal.src = 'assets/media/audios/mal-'+(actual_pregunta+1)+'.mp3'
        audio_retro_mal.load()
        audio_retro_mal.onloadedmetadata = function(){
            audio_retro_mal.onloadedmetadata = null
            audio_retro_mal.currentTime = 0
            audio_retro_mal.play()
        }
    }

    if(key==1){
        respuestas_usuario.respuestas[actual_pregunta].respuesta = actual_pregunta_data.opcion1
    }else if(key==2){
        respuestas_usuario.respuestas[actual_pregunta].respuesta = actual_pregunta_data.opcion2
    }else if(key==3){
        respuestas_usuario.respuestas[actual_pregunta].respuesta = actual_pregunta_data.opcion3
    }
    respuestas_usuario.puntaje = resultados
    respuestas_usuario.actual = (actual_pregunta+1)
    saveScorm()

    getE('retroalimentacion').className = 'retroalimentacion-on'
    getE('zonas').className = 'zonas-off'
}

var resumed = false
function goVideo(btn){
    var status = btn.className
    if(status=='video-btn-enabled'){
        //volver a ver el vidio
        audio_pregunta.pause()
        audio_pregunta.loadedmetadata = null
    
        resumed = true
    
        getE('header').className = 'header-off'
        getE('situacion').className = 'situacion-on'
        getE('situaciones-mask').className = 'situaciones-mask-on'
        getE('pregunta-app').className = 'pregunta-off'
        
        underground_mp3.pause()
        
        player.play().then(function() {
            //getE('situacion-video').play()
            getE('situaciones-mask').className = 'situaciones-mask-off'
            setTimeline(true)
        })
    }
}


/*****************RETRO***************/
function overContinuar(){
    over_option.currentTime = 0
    over_option.play()
    //getE('retroalimentacion-btn').className = 'retroalimentacion-over'
}
function outContinuar(){
    //getE('retroalimentacion-btn').className = ''
}
var animacion_retroalimentacion = null
function clickContinuar(){
    click_mp3.currentTime = 0
    click_mp3.play()
    audio_retro_bien.pause()
    audio_retro_bien.onloadedmetadata = null
    audio_retro_mal.pause()
    audio_retro_mal.onloadedmetadata = null

    getE('retroalimentacion').className = 'retroalimentacion-off'

    animacion_retroalimentacion = setTimeout(function(){
        clearTimeout(animacion_retroalimentacion)
        animacion_retroalimentacion = null

        getE('pregunta-app').className = 'pregunta-gone'
        pregunta_gone.currentTime = 0
        pregunta_gone.play()

        animacion_retroalimentacion = setTimeout(function(){
            clearTimeout(animacion_retroalimentacion)
            animacion_retroalimentacion = null
            
            actual_pregunta++
            getE('pregunta-cont').className = "pregunta-init"
            getE('opcion1').className = "opcion1"+actual_pregunta_data.size+" opcion-cont opcion1_init"
            getE('opcion2').className = "opcion2"+actual_pregunta_data.size+" opcion-cont opcion2_init"
            getE('opcion3').className = "opcion3"+actual_pregunta_data.size+" opcion-cont opcion3_init"

            setPregunta()
        },1000)
    },500)
}