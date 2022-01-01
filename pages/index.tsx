import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from 'react';
import Form from '../components/Form';

export const getServerSideProps = async ({ req }) => {
  const prisma: PrismaClient = new PrismaClient()

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
    <>
    <div> 
      {/* {JSON.stringify(user)} */}
    </div>
      <Form />
    </>
  )
}