export const party = {
  date: 'Sábado, 03 de octubre de 2026',
  time: '3:00 p. m.',
  startsAt: '2026-10-03T15:00:00-06:00',
  street: 'Calle Buenavista 16',
  city: 'Cocotitlán, Estado de México',
}

export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(party.street + ', ' + party.city)

// The explicit offset keeps the event fixed to Mexico City time for every guest.
export function getCountdown(now = Date.now()) {
  const total = Math.max(0, Math.floor((Date.parse(party.startsAt) - now) / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
    finished: total === 0,
  }
}
