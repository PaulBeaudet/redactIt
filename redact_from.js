// redact_from.js ~ Copyright 2016 Paul Beaudet

var redact = {
    fs: require('fs'),                       // node module for filesystem opperations
    file: function (sourcefile, redactions){ // initial method to redact a file 
        redact.fs.readFile(sourcefile, redact.onSourceRead(redactions));
    },
    onSourceRead: function(redactions){      // hold redaction string in closure
        return function(error, data){        // return file read callback
            if(error){console.log('source read error: ' + error);}
            else if (data){                  // given proper source data read in sensor data
                redact.result(data.toString(), redactions);
            } else {console.log('no data to redact');}
        }
    },
    result: function(sourceStr, redactStr){
        var redactArray = redactStr.split(", ");
        console.log(redactArray);
        for(var i = 0; i < redactArray.length; i++){
            redaction = new RegExp(redactArray[i], "gi");
            sourceStr = sourceStr.replace(redaction, "XXXX");
        }
        console.log(sourceStr);
    }
}

// execution
var sourceArgument = process.argv[2];        // path to source text to redact (first parameter)
var redactArgument = process.argv[3];        // censor string argument, comma deliminated in double (second parameter)
redact.file(sourceArgument, redactArgument); // initial execution of redact_from opperation
