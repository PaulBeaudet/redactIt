# Command line redaction utility

Included is a node based command line program that marks over / redacts sensitive information in documents

Node.js must be installed for this utility to work

see start.js for Linux based setup or visit https://nodejs.org/en/download/

## Use example

redact_from takes two arguments first a source file then followed by a string of comma diliminated redactions

    node redact_from.js fileToBeRedacted.txt "James Bond, Moneypenny, Q, M, Ernst Stavro, Bill Tanner"

## Notes on use

Keep in mind in this method of use the orgininal file will remain on source media (deletion is not sufficient) and redaction terms will show up in bash history and exist in RAM. In some cases absolute delation of source may be desirable in others retaining source is preferable. In either case copying to external media for distribution of censored material is recomended.

#### In the case of complete redaction

Toggle bash history

    set +o history

FEATURE UNWRITEN:
-  Write files in place with redactions variably larger then censored text,
-  sensor filename
-  rename/move txt destination
