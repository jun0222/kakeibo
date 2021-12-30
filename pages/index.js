import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from 'react';

export const getServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient()

  const uniqueUser = await prisma.user.findUnique({
    where: {
      id: '1e6d4408-3b1f-420e-b4a8-94ff92ef8c1a',
    },
  })
  // Date型でエラーが起きるので、一度stringifyしてからparse
  const user = JSON.parse(JSON.stringify(uniqueUser));

  return { props: { user } }
}

export default ({ user }) => {
  useEffect(() => {
    console.info(user);
  }, [])

  return (
    <div> 
      {JSON.stringify(user)}
    </div>
  )
}