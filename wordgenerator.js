// Word Generator
// -----
// prepare to be inspired!

// Dependencies
// -----

var fs = require('fs')

// **Main stuff**
var WordGenerator = module.exports = function(opts,callback){
  // assume we'll load some lists in
  this.reading = true
  this.queue = []
  this.words = []
  this.numWords = 0
  // set up word lists
  fs.readdir(__dirname + '/lists',function(err,files){
    files.forEach(function(list){
      this.addFile(__dirname + '/lists/' + list)
    }.bind(this))
  }.bind(this))
  if(opts && callback){
    // we've been passed options. Do async generation.
    this.generate(opts,callback)
  }
}

// **Generate!**
WordGenerator.prototype.generate = function(opts,callback){
  if(this.reading){
    this.queue.push({opts : opts, callback : callback})
  } else {
    // allow junk to be passed in place of opts to just take defaults
    var opts = (typeof opts == 'object') ? opts : {},
        num = opts.num || 3,
        separator = opts.separator || '-',
        words = [],
        w=0
    for(w;w<num;w++){
      words.push(this.words[Math.floor(Math.random() * this.numWords)])
    }
    callback(null,words.join(separator))
  }
}

// **Catch up the queue**
WordGenerator.prototype.catchupQueue = function(){
  while(this.queue.length){
    var q = this.queue.shift()
    this.generate(q.opts,q.callback)
  }
}

// **Add File**
// adds a file to the word list, separated by lines.
WordGenerator.prototype.addFile = function(filePath){
  this.reading = true
  var words = this.words,
      reader = fs.createReadStream(filePath),
      current = ''
  reader.on('data',function(data){
    current += data
    var last = 0,
        index = current.indexOf('\n')
    while(~index){
      var line = current.substring(last,index)
      last = index+1
      words.push(line)
      index = current.indexOf('\n',last)
    }
    current = current.substring(last)
  })
  reader.on('end',function(){
    if(current.length){
      words.push(current)
    }
    // cache the word length
    this.numWords = words.length
    this.reading = false
    this.catchupQueue()
  }.bind(this))
}