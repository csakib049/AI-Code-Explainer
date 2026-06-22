const Error = ({ error }) => {
  return (
    <div className='mt-6 bg-red-900/30 border border-red-700 p-4 rounded-xl'>
      <p className='text-red-400 flex items-center gap-2'>
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </p>
    </div>
  )
}

export default Error
