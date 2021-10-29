import type { NextPage } from 'next'

import { HeadComponent } from '../components/Head'
import { LinkList } from '../components/LinkList'

const Home: NextPage = () => {
  return (
    <>
      <HeadComponent />
      <LinkList />
    </>
  )
}

export default Home
