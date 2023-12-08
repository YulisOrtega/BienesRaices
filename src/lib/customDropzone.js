import {Dropzone} from "dropzone";

Dropzone.options.imageBox={
    dictDefaultMessage:"Please load the images about property",
    acceptedFiles:".png, .jpg, .jpeg, .bmp, .svg",
    maxFilesize:5,
    maxFiles: 1,
    parallelUploads:1,
    autoProcessQueue: false,
    addRemoveLinks:true,
    dictRemoveFile:"Delete image",
    dictMaxFilesExceeded:"Just one image per property",
    paramName:'imageBox',
    init: function(){
        const dropzone = this
        const btnPost=document.querySelector('#postImage')

        btnPost.addEventListener('click', function(){
            dropzone.processQueue();
        })
        dropzone.on('error', function(file, mensaje){
            console.log(`Hubo un error ${mensaje}`)
        })
        dropzone.on('queuecomplete', function(){
            if(dropzone.getActiveFiles().length == 0){
                window.location.href='/home'
            }
        })
    }
}