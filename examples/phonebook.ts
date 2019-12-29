import { Fritzbox } from '../src/lib/fritzbox'
import { requestXml } from '../src/lib/request'
import { inspect } from 'util'

const box = new Fritzbox({ username: 'test', password: 'testPwd123' })

box
  .exec('urn:dslforum-org:service:X_AVM-DE_OnTel:1', 'GetPhonebook', {
    NewPhonebookID: 0,
  })
  .then((result: any) => {
    const uri = result.NewPhonebookURL
    console.log(uri)
    return requestXml({ uri, rejectUnauthorized: false })
  })
  .then(book => console.log(inspect(book, { depth: null })))
  .catch(err => {
    console.log(err)
  })
