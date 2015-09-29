# bubbleShooter
A canvas based JS game that recreates the 90s classic Snood.

Getting the cannon barrel to render right on swivel took a fair bit of trigonometry.  To muddy the waters, 
th canvas coordinate system uses down as the positive y direction.  When drawing an arc, it also measures
angles in radians going clockwise from the right, counter to your typical polar coordinates.
