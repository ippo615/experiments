# Verlet Integration

Verlet integration uses a point's position and acceleration to
determine where it should be. Instead of acceleration we're using
force and mass (more on why later). The idea is to use the point's
current and previous position to determine its velocity then use the
velocity and acceleration to determine the new position.

## Important Terms

*Point* A single entity that can undergo motion from changes in
position and applied forces. Points have a position, a mass, and a
force.

*Position* A 3-dimensional vector that represents the location of the
center of a point.

*Mass* The amount of matter that makes a point. Larger masses respond
more slowly to forces, smaller masses respond quicker to forces.

*Force* A vector representing the amount of force that will be used to
change the object's position in this step.

## Overview

There are 2 ways to manipulate points:

	- change their postion 

		point.position = new Vector(10,5,2)
		point.position.add( new Vector(-1,0,0) )

	- apply a force

		point.force.set( 0,9.8,0 )
		point.force.add( new Vector(0,9.8,0) )

The integration step will handle the rest.

To run the integration use `verletStep`. It requires 3 parameters:

`points` an array of verlet points that should be updated.

`dt` the amount of time between the last frame and the current frame.
Verlet integration works best with a constant `dt`. Variable `dt`s is
not currently implemented but it is possible. (There are 2 ways:
rescale the current velocity in terms of the new time to old time ratio,
divide the timesteps into smaller constant dts).

`drag` is the amount of velocity that gets applied. If you wanted all
motions to slow down by 98% every frame, you would use a `drag` of
`0.98`. It should be between 0.0 and 1.0 (it can be outside that range
but from a physical perspective would not make sense).

## Architecture

A single function handles the verlet integration. This is more useful
than having a `.step` method on the `Point` class because it encourages
a design that can be offloaded to the GPU. I cannot (currently) pass a
`Point` class to the GPU and call it's `.step` method. I could write a
shader that handles the verlet integration on some data which represent
the points.

More "simulation" stuff can also be coded in a similar manner. Like
gravity:

	function gravityStep( points, gravity ){
		for( var j=0,l=points.length; j<l; j+=1 ){
			points[j].force.add( gravity );
		}
	}

Or constraint solving:

	function constraintStep( constraints ){
		for( var j=0,l=constraints.length; j<l; j+=1 ){
			// resolve constraints[j]
		}
	}

This makes it easy to add stages in your shader pipeline (for the GPU)
or add function calls (for the CPU).

## Compositing (or combining, chaining)

When you want a more complicated physics simulation you can combine
certain effects to achieve the desired result. I believe the best way
to do that is:

	1.) Breakable (low proirity) rules
	2.) Verlet Integration
	3.) Unbreakable (important) rules

For example:

	1.) Gravity
	2.) User Driven Forces
	3.) Verlet Integration
	4.) Contraint Solving
	5.) Pinning/Collision Resolution

That order is merely an example, I'll explain what each represents and
why I find it useful to use that approach.

The first part are rules can be broken. For example, people don't fall
through floors (or the ground); therefore, the gravity rule can be
"broken." Consider what would happen if you applied gravity and verlet
integration after the collision resolution step: things would be
slightly embedded in the floor instead of resting on top of it. A "user
driven force" (ie something for interaction) can also be stopped (ie
you do not your users to push boxed through walls).

The second part is the verlet integration. This uses the previous
forces and motion to update the position of every point. It also resets
the forces on the object to `0,0,0`.

The final part is the stuff that *must* always be correct. For example,
a point that should be pinned to a specific location should be corrected
(pinned) at the end so you know that it will stay at its assigned
location.

Trial and error will help you fine tune the order.
