# BubbleShooter
A canvas based JS game that recreates the 90s classic Puzzle Bobble (also known as Snood).

Getting the cannon barrel to render right on swivel took a fair bit of trigonometry.  To muddy the waters,
the canvas coordinate system uses down as the positive y direction.  When drawing an arc, it also measures
angles in radians going clockwise from the right, counter to your typical polar coordinates.

In order to detect whether there whether a shot connects three or more bubbles of the same color, I did a breadth first-search of neighboring bubbles.
