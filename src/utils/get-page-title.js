import defaultSettings from '@/settings'

const title = defaultSettings.title || 'sungrow'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
