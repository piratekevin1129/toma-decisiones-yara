/*********************SCORM***********************/

var data_scorm = null
var score = 100
var limit_score = 100
var total_attemps = 1
var course_name = 'Competencia de liderazgo en seguridad'
var scorm_enabled = true

var respuestas_usuario = {
    actual:0,
    respuestas:[],
    completado:false,
    puntaje:0
}

function initScorm(callBack){
    if(scorm_enabled){
        startTimeStamp = new Date();

        //iniciar
        ScormProcessInitialize();
        
        //getNames()
        console.log("vamos a cargar los datos")

        //se tiene que poner si o si
        var status_ = ScormProcessGetValue("cmi.core.lesson_status");
        if (status_ == "not attempted"){
            ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
            ScormProcessCommit()
        }

        var data_ = ScormProcessGetValue("cmi.suspend_data")
        var tiempo_ = ScormProcessGetValue("cmi.core.total_time")
        console.log("----data----")
        console.log(data_)
        console.log("----tiempo----")
        console.log(tiempo_)
        console.log("----lesson---")
        console.log(status_)

        if(data_!=null&&data_!=""&&data_!=undefined){
            var suspend_parsed = JSON.parse(data_)
            
            data_scorm = suspend_parsed.datos
            total_attemps = data_scorm.total_attemps
            total_attemps++

            respuestas_usuario = data_scorm
            callBack(respuestas_usuario)
        }else{
            console.log("no definida suspend data")
            callBack(respuestas_usuario)
        }
    }else{
        callBack(respuestas_usuario)
    }
}

function saveScorm(_finish){
    var finish = false
    if(_finish!=null&&_finish!=undefined){
        finish = _finish
    }
	if(scorm_enabled){
		console.log("vamos a guardar los datos")
		var data_prepare = prepareSaveScorm()
		
		ScormProcessSetValue("cmi.suspend_data",data_prepare)

		if(finish){
			console.log("completaa")
			reachedEnd = true
			ScormProcessSetValue("cmi.core.exit", "");
			ScormProcessSetValue("cmi.core.lesson_status", "completed");

			ScormProcessSetValue("cmi.core.score.raw", score);//calificacion
			ScormProcessSetValue("cmi.core.score.min", "0");
			ScormProcessSetValue("cmi.core.score.max", "100");
			
			/*if (score >= limit_score){
				ScormProcessSetValue("cmi.core.lesson_status", "passed");
			}else{
				ScormProcessSetValue("cmi.core.lesson_status", "failed");
			}*/
		}else{
			//no finaliza, solo guarda el data suspend
		}
		
		ScormProcessCommit()
		console.log("Los datos han sido guardados")
        console.log(data_prepare)
	}
}

function prepareSaveScorm(){
	var preparar_data = {
		datos:respuestas_usuario,
        total_attemps:total_attemps,
        name:course_name
	}
	
    var suspend = JSON.stringify(preparar_data);
	return suspend//string
}