node-wordgenerator
==================

Quick and dirty wordlist based word generator for inspiration when naming shit

Works like the github repo name generator, making things like:

baroque-macrology-gophers
naivest-jello-nastygram
gunning-studly-quarters

Usage:
---

install it

    npm install wordgenerator

in your codes:

    var WordGenerator = require('wordgenerator')

Now you can

    new WordGenerator({num : 3, separator : '-'},function(err,words){
      var randomWords = words
    })

If you want to use it more than once, it's smarter to:

    var generator = new WordGenerator()

That way the lists will be cached and all that goodness. Now you can

    generator.generate({num : 3, separator : '-'},function(err,words){
      var randomWords = words
    })

The options can just be a boolean to take defaults, which are `{num : 3, separator : '-'}`:

    generator.generate(true,function(err,words){
      var randomWords = words
    })


Bonus:
---

Add your own words from a file:

    var wg = new WordGenerator()
    wg.addFile(__dirname + '/relative/path/to/file.lst')

Words are stored on the generator, so go nuts:

    wg.words.push('someword')

However, the length is cached, so you must update it too.

    wg.numWords ++

Hate my words? Well whatever, just clear them out and replace them

    wg.words = ['coffin']
    wg.numWords = 1

Now the only word it generates is "coffin", and calling it is a waste of cpu.