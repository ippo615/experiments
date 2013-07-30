var GAME_MODULE = function ($self) {
    if (!$self) {
        $self = {};
    }
    /// ------------------------------------------ [ Utility Functions ] --
    var requestAnimFrame = (function () {
        /// Compatibility for animation frame on older browsers
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();


    $self.game_frame_last_time = 0;
    $self.game_frame_this_time = 0;
    $self.game_frame_max_dt = 0.5;
    $self.game_frame_total_time = 0;
    // Constant update rate
    $self.game_is_update_rate_constant = 1;
    $self.game_frame_const_update_dt = 0.02;
    $self.game_frame_time_of_last_update = 0;
    $self.game_frame_time_since_last_update = 0;
    // Constant draw rate
    $self.game_is_draw_rate_const = 1;
    $self.game_frame_const_draw_dt = 0.04;
    $self.game_frame_time_of_last_draw = 0;
    $self.game_frame_time_since_last_draw = 0;

    $self.game_update_functions = [];
    $self.game_draw_functions = [];
    $self.game_on_update = function ($self, dt) {};
    $self.game_on_draw = function ($self, dt) {};

    $self.game_push_update_function = function (onUpdate) {
        /// Pushes the update function onto the stack and uses it 
        /// as the current update function.
        $self.game_update_functions.push($self.game_on_update);
        $self.game_on_update = onUpdate;
    };

    $self.game_pop_update_function = function () {
        /// Pops the last update function from the stack. Uses the
        /// previous update function as the current one.
        if ($self.game_update_functions.length > 0) {
            $self.game_on_update = $self.game_update_functions.pop();
        }
    };

    $self.game_set_update_function = function (onUpdate) {
        /// Sets the game's update function. The update function should be of
        /// the form: function gameUpdate($self,dt). $self is the handle to the
        /// game module. dt is the amount of seconds that have passed between
        /// the last update call.
        $self.game_on_update = onUpdate;
    };

    $self.game_push_draw_function = function (onDraw) {
        /// Pushes the old draw function onto the stack and uses
        /// the passed one as the current draw function.
        $self.game_draw_functions.push($self.game_on_draw);
        $self.game_on_draw = onDraw;
    };

    $self.game_pop_draw_function = function () {
        /// Pops the last draw function from the stack. Uses the
        /// previous draw function as the current one.
        if ($self.game_draw_functions.length > 0) {
            $self.game_on_draw = $self.game_draw_functions.pop();
        }
    };

    $self.game_set_draw_function = function (onDraw) {
        $self.game_on_draw = onDraw;
    };

    $self.game_limit_updates_per_second = function (updatesPerSec) {
        /// Forces the game to be updated 'updatesPerSec' times per second. It 
        /// also gives you a constant time step (dt) between frames.
        $self.game_is_update_rate_constant = 1;
        $self.game_frame_const_update_dt = 1 / updatesPerSec;
    };

    $self.game_limit_draws_per_second = function (drawsPerSec) {
        /// Forces the game to be redrawn 'drawsPerSec' times per second. It 
        /// also gives you a constant time step (dt) between drawing frames.
        $self.game_is_draw_rate_const = 1;
        $self.game_frame_const_draw_dt = 1 / drawsPerSec;
    };

    $self.game_unlimit_updates = function () {
        /// Lets the game update as many times as the engine will allow.
        /// You will get variable time steps (dt) between updates.
        $self.game_is_update_rate_constant = 0;
    };

    $self.game_unlimit_draws = function () {
        /// Lets the game redraw as many times as the engine will allow.
        /// You will get variable time steps (dt) between redraws.
        $self.game_is_draw_rate_const = 0;
    };

    /// ------------------------------------------- [ Game Update Loop ] --
    $self.game_update = function () {
        /// The game's main update loop:

        // Compute the difference in time between this frame and the last.
        $self.game_frame_last_time = $self.game_frame_this_time;
        $self.game_frame_this_time = (new Date()).getTime();

        // The times are in milliseconds: we *0.001 to convert to seconds.
        var nIterations,
        dt = ($self.game_frame_this_time - $self.game_frame_last_time) * 0.001;

        // Limit the timestep 
        if (dt > $self.game_frame_max_dt) {
            dt = $self.game_frame_max_dt;
        }
        $self.game_frame_total_time += dt;

        // If we're throttling the update rate
        if ($self.game_is_update_rate_constant) {
            $self.game_frame_time_since_last_update = $self.game_frame_total_time - $self.game_frame_time_of_last_update;
            nIterations = Math.floor($self.game_frame_time_since_last_update / $self.game_frame_const_update_dt);
            if (nIterations > 0) {
                $self.game_frame_time_of_last_update += $self.game_frame_const_update_dt * nIterations;
                while (nIterations--) {
                    $self.game_on_update($self, $self.game_frame_const_update_dt);
                }
            }
        } else {
            $self.game_on_update($self, dt);
        }

        // If we're throttling the drawing rate
        if ($self.game_is_draw_rate_const) {
            $self.game_frame_time_since_last_draw = $self.game_frame_total_time - $self.game_frame_time_of_last_draw;
            nIterations = Math.floor($self.game_frame_time_since_last_draw / $self.game_frame_const_draw_dt);
            if (nIterations > 0) {
                $self.game_frame_time_of_last_draw += $self.game_frame_const_draw_dt * nIterations;
                $self.game_on_draw($self, $self.game_frame_const_draw_dt * nIterations);
            }
        } else {
            $self.game_on_draw($self, dt);
        }

        // setup another update
        requestAnimFrame($self.game_update);
    };

    $self.game_start = function () {
        $self.game_frame_last_time = (new Date()).getTime();
        $self.game_frame_this_time = $self.game_frame_last_time;

        requestAnimFrame($self.game_update);
    };

    return $self;
};