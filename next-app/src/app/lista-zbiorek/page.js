'use client'
import { useUser } from '@/hooks/useUser'
import React from 'react'

export default function page() {
  const { user, logout } = useUser()

  return <div>LISTA ZBIOREK, logged user: {user?.id}</div>
}
