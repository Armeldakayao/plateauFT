import Sidebar from '@/components/sidebar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Sidebar />
      <div className='md:ml-72 p-20'>{children}</div>
    </div>
  )
}
