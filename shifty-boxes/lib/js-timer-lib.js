var TIMER_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }

    $self.timer_new_queue = function(){
        /// Returns a new timing queue.
        return {currentTime:0,latestTime:0,events:[]};
    };

    $self.timer_add_event = function(queue,delta,fn,args){
       /// `delta` seconds after the last event in the `queue` run `fn(args)`.
       queue.events.push({time:queue.latestTime+delta,fn:fn,args:args});
       queue.latestTime += delta;
    };

    $self.timer_update = function(queue,dt){
      /// Update the time in queue and process any events.
      queue.currentTime += dt;
      var events = queue.events;
      var nEvents = queue.events.length;
      var event;
      while(nEvents-- && queue.events[0].time < queue.currentTime){
        event = events.shift();
        event.fn(event.args);
      }
    };

    return $self;
};