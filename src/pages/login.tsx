import type { NextPage } from 'next'

import { HeadComponent } from '../components/Head'
import { Login as LoginComponent } from '../components/Login'

const Login: NextPage = () => {
  return (
    <>
      <HeadComponent title="Create Link" />
      <LoginComponent />
    </>
  )
}

export default Login
