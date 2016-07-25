// redact_from.js ~ Copyright 2016 Paul Beaudet

var file = {
    sys: require('fs'),                                 // node module for filesystem opperations
    isDir: function(path){                              // because having functionallity was too much for this lib
        try { return file.sys.statSync(path).isDirectory();}
        catch (error) {
            if (error.code === 'ENOENT') { return false; }
            else { throw error;}
        }
    },
    isFile: function(path){                             // because having functionallity was too much for this lib
        try { return file.sys.statSync(path).isFile();} // hasToBeAFile might be a more apt method name
        catch (error) {                                 // because it just throws an error when its not...
            if (error.code === 'ENOENT') { return false; }
            else { throw error;}
        }
    }
}

var redact = {
    poly: function (sourceLoc, redactions, location){                                 // initial method to redact a file
        if(file.isFile(sourceLoc)){                                                   // when given a file
            redact.file(sourceLoc, redactions, location);                             // provide redactions for one file
        } else if (file.isDir(sourceLoc)){                                            // when given a directory
            // for files in directory perform redact.file if a txt file
        } else {console.log('source path incorrect');}
    },
    file: function(src, redactions, location){
        var path = 'example.txt';                                                     // defualt path for demonstration case
        if(location){                                                                 // given optional location option
            if (location === '-i'){ path = src; }                                     // option i for inline write
            else if ( file.isDir(location) ){ path = location + src; }                // if directory, carry over file name
            else { path = location; }                                                 // assumed new file name included case
        }
        file.sys.readFile(src, redact.onSourceRead(path, redactions));                // one off example of redaction option
    },
    onSourceRead: function(path, redactions){                                         // hold redaction string in closure
        return function(error, data){                                                 // return file read callback
            if(error){console.log('source read error: ' + error);}                    // inform on read issue
            else if (data){                                                           // given proper source data read in sensor data
                redact.result(path, data.toString(), redactions);                     // get a result given the content exist
            } else {console.log('no data to redact');}                                // blank file error case
        }
    },
    result: function(path, sourceStr, redactStr){                                     // method that does redaction
        redactStr = redactStr.replace(/['"]+/g, '');                                  // trim any qoutes, comma dilimination expected
        var redactArray = redactStr.split(/\s*,\s*/);                                 //diliminator: comma preceeded or followed by x spaces
        console.log("redacting: " + redactArray);
        for(var i = 0; i < redactArray.length; i++){                                  // for all redactions given
            sourceStr = sourceStr.replace(new RegExp(redactArray[i], "gi"), "XXXX");  // replace redaction occurences with "xxxx"
        }
        file.sys.writeFile(path, sourceStr, redact.createFile);                       // write to a seperate file
    },
    createFile: function(error){
        if(error){console.log('error writing file: ' + error)}
        else {console.log('Mission Accomplished');}
    }
}

// execution
var sourceArg = process.argv[2];             // path to source text to redact (first parameter)
var redactArg = process.argv[3];             // censor string argument, comma deliminated in double (second parameter)
var location = process.argv[4];              // optional destination/name, will write in current directory by default
redact.poly(sourceArg, redactArg, location); // initial execution of redact_from opperation
