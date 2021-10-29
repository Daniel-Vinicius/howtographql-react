import type { NextPage } from 'next'

import { HeadComponent } from '../components/Head'
import { CreateLink } from '../components/CreateLink'

const Home: NextPage = () => {
  return (
    <>
      <HeadComponent title="Create Link" />
      <CreateLink />
    </>
  )
}

export default Home
