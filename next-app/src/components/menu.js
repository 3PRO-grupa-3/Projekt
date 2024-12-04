'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Bell, Home, Megaphone, User, User2, Users } from 'lucide-react'
import Link from 'next/link'
import ModeToggle from './ModeToggle'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

export default function Menu() {
  const router = useRouter()
  const { user, logout } = useUser()

  const items = [
    {
      title: 'Zbiórki',
      url: '/lista-zbiorek',
      icon: Home,
    },
    {
      title: 'Moje zbiórki',
      url: '/moje-zbiorki',
      icon: Bell,
    },
    {
      title: 'Zgłoszone problemy',
      url: '/problemy',
      icon: Megaphone,
    },
    {
      title: 'Mój profil',
      url: '/moj-profil',
      icon: User,
    },
    ...(user?.typ === 'admin'
      ? [
          {
            title: 'Użytkownicy',
            url: '/uzytkownicy',
            icon: Users,
          },
        ]
      : []),
  ]
  return (
    <Sidebar>
      <SidebarContent className='flex flex-column justify-start items-center p-4'>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon className='mr-2 h-4 w-4' />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {user ? (
            <Button variant='outline' onClick={logout}>
              Wyloguj się
            </Button>
          ) : (
            <Button variant='outline' onClick={() => router.push('/auth/login')}>
              Zaloguj się
            </Button>
          )}
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
