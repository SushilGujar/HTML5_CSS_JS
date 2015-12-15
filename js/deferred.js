function timeoutAsync(milliseconds)
{
  var deferred = $.Deferred();
  setTimeout(function(){deferred.resolve();}, milliseconds);
  return deferred.promise();
}

function abcAsync() {
  var deferred = $.Deferred();
  var count = 0;
  var firstPromise = timeoutAsync(2000);
  var secondPromise = timeoutAsync(3000);
  var thirdPromise = timeoutAsync(1000);
  var fourthPromise = timeoutAsync(1234);
  firstPromise.always(function () { deferred.notify( ++count); });
  secondPromise.always(function () { deferred.notify(++count); });
  thirdPromise.always(function () { deferred.notify(++count); });
  fourthPromise.always(function () { deferred.notify(++count); });
  $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
        .then(function () { alert('done!'); deferred.resolve(); },
                      function () { deferred.reject(); });
                        return deferred.promise();
                      }

function runAbcAsync() {
  var promise = abcAsync();
  promise.progress(function (msg) { alert(msg); });
  return promise; }
