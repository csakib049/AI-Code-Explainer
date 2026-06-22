const Header = () => {
  return (
    <header className='flex items-center gap-4 w-full mb-6 animate-fadeInUp'>
      <div>
        <img src="/logo.png" alt="Medusa AI" className="h-36 w-auto object-contain" />
      </div>
      <h1 className='text-4xl font-bold text-white tracking-tight'>Medusa AI</h1>
    </header>
  )
}

export default Header
