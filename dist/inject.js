const setClipboard = () => navigator.clipboard.writeText(`${window.scrapbox.Project.name}: ${window.scrapbox.Page.lines.map(line => line.text).join('\n')}
from [/${window.scrapbox.Project.name}/${window.scrapbox.Page.title}]`)

window.addEventListener('rscrp:fetchPage', () => {
  setClipboard()
  window.postMessage({type: 'rscrp:pageFetched:default'}, '*')
}, false)

let projects = []

const getProjects = async () => {
  const res = await fetch('https://scrapbox.io/api/projects')
  const json = await res.json()
  projects = json.projects
}

const rescrap = name => {
  setClipboard()
  window.postMessage({type: 'rscrp:pageFetched:withName', name}, '*')
}

const rescrapProjectFilterInput = document.createElement('input')
rescrapProjectFilterInput.type = 'text'
rescrapProjectFilterInput.id = 'rescrap-filtering-input'
rescrapProjectFilterInput.addEventListener('input', async e => {
  scrapbox.PageMenu('re-scrap').removeAllItems()
  const query = rescrapProjectFilterInput.value.toLowerCase()
  for (const { name, displayName } of projects) {
    if (!name.toLowerCase().includes(query) && !displayName.toLowerCase().includes(query)) continue
    scrapbox.PageMenu('re-scrap').addItem({
      title: displayName,
      onClick: () => { rescrap(name) }
    })
  }
})

const addSearch = () => {
  const ul = document.querySelector('ul[aria-labelledby="re-scrap"].dropdown-menu')
  if (ul === null) {
    return setTimeout(addSearch, 100)
  }
  rescrapProjectFilterInput.value = ''
  ul.prepend(rescrapProjectFilterInput)
  rescrapProjectFilterInput.focus()
}

const main = () => {
  if (document.getElementsByClassName('page').length === 0) {
    return setTimeout(main, 100)
  }
  window.scrapbox.PageMenu.addMenu({
    title: 're-scrap',
    image: 'https://i.gyazo.com/9ec387b5df641e805e42557af0e57bf7.png',
    onClick: async () => {
      for (const { name, displayName } of projects) {
        scrapbox.PageMenu('re-scrap').addItem({
          title: displayName,
          onClick: () => { rescrap(name) }
        })
      }
      addSearch()
    }
  })
}

main()
getProjects()
