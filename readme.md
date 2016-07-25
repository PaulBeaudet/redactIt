# Command line redaction utility

Included is a node based command line program that marks over or in other words redacts sensitive information in documents

Node.js must be installed for this utility to work

see setup.sh for Linux based setup or visit https://nodejs.org/en/download/

## Use example

redact_from takes two arguments first a source file then followed by a string of comma diliminated redactions

    node redact_from.js spectre.txt "James Bond, Moneypenny, Q, M, Ernst Stavro, Bill Tanner"

Above command will create a file within the same directory called example.txt. In order to specify filename or directory to put redacted the path can be added as a third optional argument

    node redact_from.js totallySpies.txt "Alex, Sam, Clover" /media/USER/disc/public/totallyNotSpies.txt

will create "/media/USER/disc/public/totallyNotSpies.txt" or

     node redact_from.js spyKids.txt "Carmen, Juni, Antonio Banderas" /media/USER/disc/

will create "/media/USER/disc/public/spyKids.txt"

## Notes on use

Keep in mind in this method of use the orgininal file will remain on source media. Typical deletion not being sufficient to physically erase file. Redaction terms may also show up in bash history and exist in RAM. In some cases absolute delation of source may be desirable in others retaining source is preferable. In either case copying to external media for distribution of censored material is recomended.

#### In the case of complete redaction

Toggle bash history

    set +o history

FEATURE UNWRITEN:
-  Write files in place with redactions variably larger then censored text,
-  sensor filename
-  rename/move txt destination
-  incorrect spelling sensitivity
-  ability to take directories of files as well as a single file
