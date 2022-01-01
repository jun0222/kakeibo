import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from 'react';

export const getServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient()

  const uniqueUser = await prisma.shopping.findMany()
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