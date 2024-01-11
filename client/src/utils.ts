export function fixDate(dt: string | undefined) {
  const dateOptions: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return dt === '' || dt === undefined
    ? new Date().toLocaleDateString('en-US', dateOptions)
    : new Date(dt).toLocaleDateString('en-US', dateOptions)
}

export function extractAlliances(players: any[]) {
  if (!players) return []

  const alliances = players
    .map((player: any) => player.alliances)
    .reduce((prev: any, curr: any) => prev.concat(curr), [])
    .filter(
      (alliance: never, index: number, arr: []) =>
        arr.indexOf(alliance) === index
    )

  let unique: any[] = []
  for (const alliance of alliances) {
    if (!alliance) continue
    if (unique.map((a: any) => a.id).includes(alliance.id)) continue

    unique.push(alliance)
  }

  return unique
}

export function calculateAge(birthDate: string, airingDate: string) {
  const birth = new Date(birthDate)
  const airing = new Date(airingDate)

  let years = airing.getFullYear() - birth.getFullYear()
  if (
    airing.getMonth() < birth.getMonth() ||
    (airing.getMonth() === birth.getMonth() &&
      airing.getDate() < birth.getDate())
  ) {
    years--
  }

  return years
}
