/*
   Determine whether or not the line segment p1,p2
   Intersects the 3 vertex facet bounded by pa,pb,pc
   Return true/false and the intersection point p

   The equation of the line is p = p1 + mu (p2 - p1)
   The equation of the plane is a x + b y + c z + d = 0
                                n.x x + n.y y + n.z z + d = 0
*/
int LineFacet(p1,p2,pa,pb,pc,p)
XYZ p1,p2,pa,pb,pc,*p;
{
   double d;
   double a1,a2,a3;
   double total,denom,mu;
   XYZ n,pa1,pa2,pa3;

   /* Calculate the parameters for the plane */
   n.x = (pb.y - pa.y)*(pc.z - pa.z) - (pb.z - pa.z)*(pc.y - pa.y);
   n.y = (pb.z - pa.z)*(pc.x - pa.x) - (pb.x - pa.x)*(pc.z - pa.z);
   n.z = (pb.x - pa.x)*(pc.y - pa.y) - (pb.y - pa.y)*(pc.x - pa.x);
   Normalise(&n);
   d = - n.x * pa.x - n.y * pa.y - n.z * pa.z;

   /* Calculate the position on the line that intersects the plane */
   denom = n.x * (p2.x - p1.x) + n.y * (p2.y - p1.y) + n.z * (p2.z - p1.z);
   if (ABS(denom) < EPS)         /* Line and plane don't intersect */
      return(FALSE);
   mu = - (d + n.x * p1.x + n.y * p1.y + n.z * p1.z) / denom;
   p->x = p1.x + mu * (p2.x - p1.x);
   p->y = p1.y + mu * (p2.y - p1.y);
   p->z = p1.z + mu * (p2.z - p1.z);
   if (mu < 0 || mu > 1)   /* Intersection not along line segment */
      return(FALSE);

   /* Determine whether or not the intersection point is bounded by pa,pb,pc */
   pa1.x = pa.x - p->x;
   pa1.y = pa.y - p->y;
   pa1.z = pa.z - p->z;
   Normalise(&pa1);
   pa2.x = pb.x - p->x;
   pa2.y = pb.y - p->y;
   pa2.z = pb.z - p->z;
   Normalise(&pa2);
   pa3.x = pc.x - p->x;
   pa3.y = pc.y - p->y;
   pa3.z = pc.z - p->z;
   Normalise(&pa3);
   a1 = pa1.x*pa2.x + pa1.y*pa2.y + pa1.z*pa2.z;
   a2 = pa2.x*pa3.x + pa2.y*pa3.y + pa2.z*pa3.z;
   a3 = pa3.x*pa1.x + pa3.y*pa1.y + pa3.z*pa1.z;
   total = (acos(a1) + acos(a2) + acos(a3)) * RTOD;
   if (ABS(total - 360) > EPS)
      return(FALSE);

   return(TRUE);
}
