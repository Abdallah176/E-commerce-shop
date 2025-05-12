import Logo from './Logo'
import NavLinks from './NavLinks'
import UserActions from './UserActions'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-4 font-bold relative">
      <Logo />
      <NavLinks />
      <UserActions />
      <MobileMenu />
    </div>
  )
}
