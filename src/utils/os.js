import os from 'os'

let host

try {
  host = os.networkInterfaces()['Беспроводная сеть'][1].address.a // togrilanadi
  if (!host) throw new Error()
} catch (err) {
  host = 'localhost'
}

export {
  host,
}
  
