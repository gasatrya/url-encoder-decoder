// Import style
import '../styles/app.scss'

// Set up variables.
const input = document.getElementById('input')
const encode = document.getElementById('encode')
const decode = document.getElementById('decode')
const copy = document.getElementById('copy')

// Encode
encode.addEventListener('click', e => {
  e.preventDefault()

  if (input.value) {
    // Check if URL is valid.
    if (!isUrl(input.value)) {
      alert('Input is not a URL! Please also make sure the URL use http or https')
      return
    }

    // Encode URL
    const encoded = fixedEncodeURIComponent(input.value)
    input.value = encoded

    // Disable button
    e.target.setAttribute('disabled', '')

    // Show copy button
    copy.classList.remove('d-none')
    copy.classList.add('d-inline-block')
  } else {
    alert('Input is empty!')
  }
})

// Decode
decode.addEventListener('click', e => {
  e.preventDefault()

  if (input.value) {
    // Decode URL
    const decoded = decodeQueryParam(input.value)
    input.value = decoded

    // Enable encode button
    encode.removeAttribute('disabled')

    // Show copy button
    copy.classList.remove('d-none')
    copy.classList.add('d-inline-block')
  } else {
    alert('Input is empty!')
  }
})

// Copy
copy.addEventListener('click', e => {
  e.preventDefault()

  // Copy input
  navigator.clipboard.writeText(input.value).then(() => {
    e.target.textContent = 'Copied'

    setTimeout(() => {
      e.target.textContent = 'Copy'
    }, 1500)
  })
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent?retiredLocale=id#description
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent#decoding_query_parameters_from_a_url
function decodeQueryParam(str) {
  return decodeURIComponent(str.replace(/\+/g, ' '))
}

// https://stackoverflow.com/a/43467144
function isUrl(string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
