# BubbleShooter
A canvas based JS game that recreates the 90s classic Puzzle Bobble (also known as Snood).

Getting the cannon barrel to render right on swivel took a fair bit of trigonometry.  To muddy the waters,
the canvas coordinate system uses down as the positive y direction.  When drawing an arc, it also measures
angles in radians going clockwise from the right, counter to your typical polar coordinates.

In order to detect whether there whether a shot connects three or more bubbles of the same color, I did a breadth first-search of neighboring bubbles. I applied the same logic for detecting when a set of bubbles is unanchored (not at all connected to the top row) so I could trigger them to drop.

I used jQuery to toggle the visibility of a modal window and insert messages to the user upon game start and game end.

Finally, I added a safeguard that you can't fire the cannon until your last fired bubble is completely clear of the cannon (used to have a problem with overlapping controls).

I've been playing with the swivel control so that users fairly fine-grained control of the cannon pivot.

##To Do
* Make shot bubbles "snap to" a trajectory that will end them in line with existing bubbles
* Improve cannon graphics
* Revise scoring so that you get bonus points for things like number of hits in a row, popping groups larger than three, etc.
* Render some sort of explosion for popped bubbles
