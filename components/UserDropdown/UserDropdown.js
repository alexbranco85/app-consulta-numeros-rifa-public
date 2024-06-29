"use client"
import { Dropdown } from 'flowbite-react';
/* import { signOut, useSession } from 'next-auth/react'; */

const UserDropdown = () => {
  /* const session = useSession(); */

  const logout = async () => {
    await signOut({
      redirect: true
    })
  }


  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
      <button data-popover-target="user-profile" type="button" className="navbar-burger flex items-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg> <span className='ml-2 text-lg'>Usuário</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>

      </button>}>
      {/* {session && session.data?.user?.permission == 1 && ( */}
        <Dropdown.Item className='pt-4 px-4'><a href='/adm/admin'>Editar Vídeos</a></Dropdown.Item>
       {/* )} */} 
      <Dropdown.Item className='pt-4 px-4'><a href='/changepasswd'>Alterar Senha</a></Dropdown.Item>
      <Dropdown.Item className='pb-4 px-4' onClick={logout}>Sair</Dropdown.Item>
    </Dropdown>
  )
}

export default UserDropdown;