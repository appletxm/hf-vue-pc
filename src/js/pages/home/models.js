import axios from 'axios'
import apiUrls from 'common/api-urls'

export function getAnnouncement() {
  return axios.get(apiUrls.getAnnouncement)
}
