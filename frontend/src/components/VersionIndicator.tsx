import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { serverURL } from '../atoms/settings'
import { CircularProgress } from '@mui/material'
import { useToast } from '../hooks/toast'

const VersionIndicator: React.FC = () => {
  const serverAddr = useRecoilValue(serverURL)

  const [version, setVersion] = useState('')
  const { pushMessage } = useToast()

  const fetchVersion = async () => {
    const res = await fetch(`${serverAddr}/api/v1/version`)

    if (!res.ok) {
      return pushMessage(await res.text(), 'error')
    }

    setVersion(await res.json())
  }

  useEffect(() => {
    fetchVersion()
  }, [])

  return (
    version
      ? <div>yt-dlp v{version}</div>
      : <CircularProgress size={15} />
  )
}

export default VersionIndicator