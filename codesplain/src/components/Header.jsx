const Header = () => {
  return (
    <header className='flex items-center gap-4 w-full max-w-4xl mb-8'>
      <div className='bg-gray-800/60 border border-gray-700 p-2 rounded-2xl shadow-lg shadow-emerald-500/10'>
        <img src="/medusa-logo.png" alt="Medusa AI" className="h-16 w-auto object-contain" />
      </div>
      <h1 className='text-4xl font-bold text-white tracking-tight'>Medusa AI</h1>
    </header>
  )
}

export default Header
