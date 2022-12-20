import React from 'react'
import { NextPage } from 'next'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { LogoutIcon } from '@heroicons/react/solid'

const dashboard: NextPage = () => {
  const signOut = () => {
      supabase.auth.signOut()
  }
  return (
   <Layout title="dashboard">
      <LogoutIcon  className='h-5 w-5' onClick={signOut}/>
   </Layout>
  )
}

export default dashboard
