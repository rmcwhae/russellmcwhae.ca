import galleries from './_galleries'

export function get() {
  const body = JSON.stringify(galleries)

  return {
    body
  }
}

