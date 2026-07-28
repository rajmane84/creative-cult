import type { Request } from 'express';
import geoip from 'geoip-lite';

function getClientIp(req: Request): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0]!.trim();
  }
  return req.ip ?? req.socket.remoteAddress ?? '';
}

export function getLocationFromRequest(req: Request): string | null {
  const ip = getClientIp(req);
  // Strip IPv6-mapped IPv4 prefix (e.g. ::ffff:127.0.0.1) so geoip-lite can match it
  const normalizedIp = ip.replace(/^::ffff:/, '');

  const geo = geoip.lookup(normalizedIp);
  if (!geo) {
    return null;
  }

  return geo.city ? `${geo.city}, ${geo.country}` : geo.country;
}
