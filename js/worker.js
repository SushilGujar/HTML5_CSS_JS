self.onmessage = function(e){
  for(c in e.data)
  {
    postMessage(e.data[c].toUpperCase());
  }
};
