export const missingFields = (res, fields?) => {
  let missingFields
  if (fields) {
    const arrFields = [...Object.entries(fields)]
    missingFields = arrFields.map(item =>
      item[1] ? null : item[0]).filter(item => item)
  }
  res.status(400).send('missing fields: ' + missingFields?.join(', '))
}
